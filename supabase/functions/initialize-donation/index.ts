import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PAYSTACK_BASE = "https://api.paystack.co";

// Paystack supports these for most merchants. NGN is the default; GHS/KES/ZAR
// for some accounts; USD for international cards on enabled merchants.
const ALLOWED = ["NGN", "USD", "GHS", "KES", "ZAR"] as const;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!PAYSTACK_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Payment provider not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const { email, amount, currency, name } = body as {
      email?: string;
      amount?: number;
      currency?: string;
      name?: string;
    };

    const emailOk = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
    const amtNum = Number(amount);
    const curr = (currency || "NGN").toUpperCase();

    if (!emailOk) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!ALLOWED.includes(curr as any)) {
      return new Response(JSON.stringify({ error: "Unsupported currency" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!Number.isFinite(amtNum) || amtNum <= 0 || amtNum > 100_000_000) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Minimum sanity: at least 100 minor units (e.g. ₦1, $1)
    // Frontend passes whole-currency amount; convert to minor units (kobo/cents).
    const minor = Math.round(amtNum * 100);
    if (minor < 100) {
      return new Response(JSON.stringify({ error: "Minimum donation is 1.00" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const initRes = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: minor,
        currency: curr,
        metadata: {
          purpose: "Sara Foundation Donation",
          donor_name: typeof name === "string" ? name.slice(0, 120) : undefined,
        },
      }),
    });
    const initJson = await initRes.json();
    if (!initRes.ok || !initJson.status) {
      console.error("Paystack donation init failed:", initJson);
      return new Response(
        JSON.stringify({ error: initJson.message || "Failed to initialize payment" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { access_code, reference } = initJson.data;
    return new Response(
      JSON.stringify({ access_code, reference, amount: minor, currency: curr }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("initialize-donation error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});