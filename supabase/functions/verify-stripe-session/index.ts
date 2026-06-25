import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STRIPE_BASE = "https://api.stripe.com/v1";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const KEY =
      Deno.env.get("Stripe_secret_key") ||
      Deno.env.get("STRIPE_SECRET_KEY") ||
      Deno.env.get("STRIPE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!KEY) {
      return new Response(JSON.stringify({ error: "Stripe not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { session_id } = await req.json();
    if (!session_id || typeof session_id !== "string") {
      return new Response(JSON.stringify({ error: "session_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(`${STRIPE_BASE}/checkout/sessions/${encodeURIComponent(session_id)}`, {
      headers: {
        Authorization: `Bearer ${KEY}`,
      },
    });
    const session = await res.json();
    if (!res.ok) {
      console.error("Stripe verify error:", session);
      return new Response(JSON.stringify({ error: "Verification failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const paid = session.payment_status === "paid";
    const purpose = session?.metadata?.purpose;
    const application_id = session?.metadata?.application_id;
    const plan = session?.metadata?.plan;
    const amount = Number(session?.amount_total || 0);
    const currency = (session?.currency || "").toUpperCase();
    const expectedUnitAmount = Number(session?.metadata?.expected_unit_amount || 0);
    const expectedCurrency = String(session?.metadata?.expected_currency || "").toUpperCase();

    // For enrollment payments, refuse to mark paid if the captured amount/currency
    // doesn't match the server-enforced expected fee stamped at session creation.
    const isEnrollment = purpose === "flip" || purpose === "cap";
    const amountMatches = !isEnrollment || (
      expectedUnitAmount > 0 &&
      amount === expectedUnitAmount &&
      currency === expectedCurrency
    );
    if (paid && isEnrollment && !amountMatches) {
      console.error("Stripe verify: amount mismatch", {
        session_id, purpose, application_id, amount, currency, expectedUnitAmount, expectedCurrency,
      });
      return new Response(JSON.stringify({
        paid: false,
        error: "Payment amount does not match expected enrollment fee",
        purpose, application_id, amount, currency,
      }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (paid && application_id) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      if (purpose === "flip") {
        await supabase.from("flip_applications").update({
          payment_status: "paid",
          paid_at: new Date().toISOString(),
          payment_amount: amount,
          payment_currency: currency,
          paystack_reference: session_id,
        }).eq("id", application_id);
      } else if (purpose === "cap") {
        const { data: app } = await supabase
          .from("cap_applications")
          .select("installments_completed, paid_amount, payment_plan")
          .eq("id", application_id)
          .maybeSingle();
        const completed = (app?.installments_completed || 0) + (plan === "installments" ? 1 : 3);
        const fully = plan === "full" || completed >= 3;
        await supabase.from("cap_applications").update({
          payment_status: fully ? "paid" : "partial",
          payment_plan: plan || "full",
          payment_currency: currency,
          paid_amount: (app?.paid_amount || 0) + amount,
          installments_completed: fully ? 3 : completed,
          paid_at: fully ? new Date().toISOString() : null,
        }).eq("id", application_id);
      }

      // Best-effort notify
      try {
        await fetch(`${SUPABASE_URL}/functions/v1/notify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            type: "contact",
            data: {
              first_name: session?.customer_details?.name || "Stripe",
              last_name: purpose || "Payment",
              email: session?.customer_details?.email || "n/a",
              topic: `${(purpose || "payment").toUpperCase()} Paid via Stripe`,
              message: `Session: ${session_id}\nAmount: ${currency} ${(amount / 100).toFixed(2)}`,
            },
          }),
        });
      } catch (_) { /* noop */ }
    }

    return new Response(JSON.stringify({
      paid,
      purpose,
      application_id,
      amount,
      currency,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("verify-stripe-session error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});