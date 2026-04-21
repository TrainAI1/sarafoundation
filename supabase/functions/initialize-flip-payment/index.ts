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
    const { application_id, currency } = body as {
      application_id?: string;
      currency?: "NGN" | "USD";
    };

    if (!application_id || !currency || !["NGN", "USD"].includes(currency)) {
      return new Response(
        JSON.stringify({ error: "application_id and currency (NGN|USD) are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: app, error: appErr } = await supabase
      .from("flip_applications")
      .select("id, email, first_name, last_name, payment_status")
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

    // NGN ₦1,000 = 100000 kobo. USD $1 = 100 cents.
    const amount = currency === "NGN" ? 100000 : 100;

    const initRes = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: app.email,
        amount,
        currency,
        metadata: {
          application_id: app.id,
          first_name: app.first_name,
          last_name: app.last_name,
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

    await supabase
      .from("flip_applications")
      .update({
        paystack_reference: reference,
        payment_currency: currency,
        payment_amount: amount,
      })
      .eq("id", application_id);

    return new Response(
      JSON.stringify({ access_code, reference, amount, currency }),
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