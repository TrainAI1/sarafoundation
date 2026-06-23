import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PAYSTACK_BASE = "https://api.paystack.co";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!PAYSTACK_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Payment provider not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const { application_id, currency, plan } = body as {
      application_id?: string;
      currency?: "NGN" | "USD";
      plan?: "full" | "partner_split";
    };

    if (!application_id || !currency || !["NGN", "USD"].includes(currency)) {
      return new Response(
        JSON.stringify({ error: "application_id and currency (NGN|USD) are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const effectivePlan: "full" | "partner_split" = plan === "partner_split" ? "partner_split" : "full";

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: app, error: appErr } = await supabase
      .from("flip_applications")
      .select("id, email, first_name, last_name, payment_status, partner_code_id")
      .eq("id", application_id)
      .maybeSingle();

    if (appErr || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (app.payment_status === "paid") {
      return new Response(JSON.stringify({ error: "Application already paid" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Pricing:
    //  - No partner code: NGN ₦2,000 (200_000 kobo) / USD $1.30 (130 cents)
    //  - Partner code + full: NGN ₦90,000 (9_000_000 kobo) / USD $60 (6000 cents)
    //  - Partner code + split: ₦30,000 upfront (3_000_000 kobo), NGN only, ₦60,000 commitment
    if (effectivePlan === "partner_split" && !app.partner_code_id) {
      return new Response(JSON.stringify({ error: "Partner split requires a valid partner reference code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    let effectiveCurrency = currency;
    if (effectivePlan === "partner_split") effectiveCurrency = "NGN";

    let amount: number;
    if (effectivePlan === "partner_split") {
      amount = 3_000_000;
    } else if (app.partner_code_id) {
      amount = effectiveCurrency === "NGN" ? 9_000_000 : 6_000;
    } else {
      amount = effectiveCurrency === "NGN" ? 200_000 : 130;
    }

    const initRes = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: app.email,
        amount,
        currency: effectiveCurrency,
        metadata: {
          application_id: app.id,
          first_name: app.first_name,
          last_name: app.last_name,
          plan: effectivePlan,
          purpose: "FLIP Fellowship Enrollment",
        },
      }),
    });

    const initJson = await initRes.json();
    if (!initRes.ok || !initJson.status) {
      console.error("Paystack init failed:", initJson);
      return new Response(
        JSON.stringify({ error: initJson.message || "Failed to initialize payment" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { access_code, reference } = initJson.data;

    const updatePayload: Record<string, unknown> = {
      paystack_reference: reference,
      payment_currency: effectiveCurrency,
      payment_amount: amount,
    };
    if (effectivePlan === "partner_split") {
      updatePayload.outstanding_commitment = 60000;
    }
    await supabase
      .from("flip_applications")
      .update(updatePayload)
      .eq("id", application_id);

    return new Response(
      JSON.stringify({ access_code, reference, amount, currency: effectiveCurrency, plan: effectivePlan }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("initialize-flip-payment error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});