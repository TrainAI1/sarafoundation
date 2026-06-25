import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STRIPE_BASE = "https://api.stripe.com/v1";
// Stripe processes all majors. NGN is intentionally excluded (use Paystack for NGN).
const ALLOWED = ["USD", "EUR", "GBP", "GHS", "KES", "ZAR", "CAD", "AUD"] as const;

// Server-side enrollment pricing per program & currency, in whole units.
// Reference: CAP & FLIP full = £500 / ~₦1,000,000. Stripe handles non-NGN only.
const ENROLLMENT_FULL: Record<string, Record<string, number>> = {
  cap:  { USD: 650, EUR: 600, GBP: 500, GHS: 8000, KES: 85000, ZAR: 12000, CAD: 900, AUD: 1000 },
  flip: { USD: 650, EUR: 600, GBP: 500, GHS: 8000, KES: 85000, ZAR: 12000, CAD: 900, AUD: 1000 },
};

function expectedEnrollmentAmount(
  purpose: "flip" | "cap",
  currency: string,
  plan: "full" | "installments" | undefined,
): number | null {
  const full = ENROLLMENT_FULL[purpose]?.[currency];
  if (!full) return null;
  // CAP supports 3-installment plan via Stripe; FLIP is full-only.
  if (purpose === "cap" && plan === "installments") {
    return Math.round((full / 3) * 100) / 100;
  }
  return full;
}

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
    const KEY =
      Deno.env.get("Stripe_secret_key") ||
      Deno.env.get("STRIPE_SECRET_KEY") ||
      Deno.env.get("STRIPE_API_KEY");
    if (!KEY) {
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
    // Server-side amount enforcement: enrollment fees are fixed per program/currency
    // and must NEVER be trusted from the client. Only donations honor client-supplied amounts.
    let effectiveAmount: number;
    if (purpose === "flip" || purpose === "cap") {
      if (!application_id) {
        return new Response(JSON.stringify({ error: "application_id required for enrollment" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const table = purpose === "flip" ? "flip_applications" : "cap_applications";
      const { data: app, error: appErr } = await supabase
        .from(table)
        .select("id, payment_status")
        .eq("id", application_id)
        .maybeSingle();
      if (appErr || !app) {
        return new Response(JSON.stringify({ error: "Application not found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (app.payment_status === "paid") {
        return new Response(JSON.stringify({ error: "Application already paid" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const expected = expectedEnrollmentAmount(purpose, curr, plan);
      if (expected == null) {
        return new Response(JSON.stringify({ error: "Unsupported currency for this program" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      effectiveAmount = expected;
    } else {
      const amt = Number(amount);
      if (!Number.isFinite(amt) || amt <= 0 || amt > 10_000_000) {
        return new Response(JSON.stringify({ error: "Invalid amount" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      effectiveAmount = amt;
    }
    if (!success_url || !cancel_url) {
      return new Response(JSON.stringify({ error: "success_url and cancel_url required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const unitAmount = ZERO_DECIMAL.has(curr) ? Math.round(effectiveAmount) : Math.round(effectiveAmount * 100);
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
    // Stamp the server-enforced expected amount on the session for verify-time cross-check.
    payload["metadata[expected_unit_amount]"] = unitAmount;
    payload["metadata[expected_currency]"] = curr;

    const res = await fetch(`${STRIPE_BASE}/checkout/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
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