import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STRIPE_BASE = "https://connector-gateway.lovable.dev/stripe/v1";
const ALLOWED = ["USD", "NGN", "EUR", "GBP", "GHS", "KES", "ZAR", "CAD", "AUD"] as const;

type Body = {
  purpose: "donation" | "flip" | "cap";
  email: string;
  name?: string;
  currency: string;
  amount: number; // whole units (e.g. 25.00)
  application_id?: string;
  preferred_track?: string;
  plan?: "full" | "installments";
  success_url: string;
  cancel_url: string;
};

function form(obj: Record<string, string | number | undefined | null>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    p.append(k, String(v));
  }
  return p.toString();
}

// Zero-decimal currencies per Stripe. Keep NGN as 2-decimal (kobo).
const ZERO_DECIMAL = new Set(["JPY", "KRW", "VND", "CLP", "PYG", "RWF", "UGX", "VUV", "XAF", "XOF", "BIF"]);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const KEY = Deno.env.get("STRIPE_SANDBOX_API_KEY") || Deno.env.get("STRIPE_API_KEY");
    const LOVABLE_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!KEY || !LOVABLE_KEY) {
      return new Response(JSON.stringify({ error: "Stripe not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as Body;
    const {
      purpose, email, name, currency, amount,
      application_id, preferred_track, plan,
      success_url, cancel_url,
    } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const curr = (currency || "USD").toUpperCase();
    if (!ALLOWED.includes(curr as any)) {
      return new Response(JSON.stringify({ error: "Unsupported currency" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0 || amt > 10_000_000) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!success_url || !cancel_url) {
      return new Response(JSON.stringify({ error: "success_url and cancel_url required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const unitAmount = ZERO_DECIMAL.has(curr) ? Math.round(amt) : Math.round(amt * 100);
    if (unitAmount < 50) {
      return new Response(JSON.stringify({ error: "Amount below minimum" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const productName =
      purpose === "donation" ? "Sara Foundation Donation"
      : purpose === "flip" ? "FLIP Fellowship Enrollment"
      : "CAP Tech Hub Enrollment";

    // Build line_items[0]
    const payload: Record<string, string | number> = {
      mode: "payment",
      "payment_method_types[0]": "card",
      customer_email: email,
      "line_items[0][quantity]": 1,
      "line_items[0][price_data][currency]": curr.toLowerCase(),
      "line_items[0][price_data][unit_amount]": unitAmount,
      "line_items[0][price_data][product_data][name]": productName,
      success_url: success_url + (success_url.includes("?") ? "&" : "?") + "session_id={CHECKOUT_SESSION_ID}",
      cancel_url,
      "metadata[purpose]": purpose,
    };
    if (name) payload["metadata[donor_name]"] = name.slice(0, 120);
    if (application_id) payload["metadata[application_id]"] = application_id;
    if (preferred_track) payload["metadata[preferred_track]"] = preferred_track.slice(0, 120);
    if (plan) payload["metadata[plan]"] = plan;

    const res = await fetch(`${STRIPE_BASE}/checkout/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_KEY}`,
        "X-Connection-Api-Key": KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("Stripe session error:", json);
      return new Response(
        JSON.stringify({ error: json?.error?.message || "Failed to create session" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ url: json.url, session_id: json.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("create-stripe-checkout error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});