import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PAYSTACK_BASE = "https://api.paystack.co";

// Amounts in lowest unit (kobo for NGN, cents for USD)
const AMOUNTS = {
  full: { NGN: 9_000_000, USD: 6_000 },           // ₦90,000 / $60
  installments: { NGN: 3_000_000, USD: 2_000 },   // ₦30,000 / $20 per month
};

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
      plan?: "full" | "installments";
    };

    if (!application_id || !currency || !["NGN", "USD"].includes(currency) || !plan || !["full", "installments"].includes(plan)) {
      return new Response(
        JSON.stringify({ error: "application_id, currency (NGN|USD), and plan (full|installments) are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: app, error: appErr } = await supabase
      .from("cap_applications")
      .select("id, email, full_name, payment_status, payment_plan, payment_currency, installments_completed")
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

    // If installments already started, lock plan & currency
    let effectivePlan = plan;
    let effectiveCurrency = currency;
    if (app.installments_completed > 0) {
      effectivePlan = "installments";
      if (app.payment_currency === "NGN" || app.payment_currency === "USD") {
        effectiveCurrency = app.payment_currency;
      }
    }

    const amount = AMOUNTS[effectivePlan][effectiveCurrency];
    const installmentNumber = effectivePlan === "installments" ? app.installments_completed + 1 : 0;

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
          full_name: app.full_name,
          plan: effectivePlan,
          installment_number: installmentNumber,
          purpose: "CAP Tech Hub Cohort 3 Enrollment",
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

    // Set the active payment plan + currency on first payment, and store this transaction's reference
    await supabase
      .from("cap_applications")
      .update({
        paystack_reference: reference,
        payment_currency: effectiveCurrency,
        payment_plan: effectivePlan,
        total_amount: AMOUNTS.full[effectiveCurrency],
      })
      .eq("id", application_id);

    return new Response(
      JSON.stringify({ access_code, reference, amount, currency: effectiveCurrency, plan: effectivePlan }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("initialize-cap-payment error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});