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
      return new Response(JSON.stringify({ error: "Payment provider not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { reference } = await req.json();
    if (!reference || typeof reference !== "string") {
      return new Response(JSON.stringify({ error: "reference is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const verifyRes = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });
    const verifyJson = await verifyRes.json();

    if (!verifyRes.ok || !verifyJson.status) {
      console.error("Paystack verify failed:", verifyJson);
      return new Response(JSON.stringify({ error: "Verification failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tx = verifyJson.data;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: app } = await supabase
      .from("flip_applications")
      .select("id, email, first_name, last_name, payment_status, preferred_track")
      .eq("paystack_reference", reference)
      .maybeSingle();

    if (!app) {
      return new Response(JSON.stringify({ error: "Application not found for this reference" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (tx.status !== "success") {
      await supabase
        .from("flip_applications")
        .update({ payment_status: "failed" })
        .eq("id", app.id);
      return new Response(JSON.stringify({ paid: false, status: tx.status }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (app.payment_status !== "paid") {
      await supabase
        .from("flip_applications")
        .update({
          payment_status: "paid",
          paid_at: new Date().toISOString(),
          payment_amount: tx.amount,
          payment_currency: tx.currency,
        })
        .eq("id", app.id);

      // Fire-and-forget admin log via existing notify pattern
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
              first_name: app.first_name,
              last_name: app.last_name,
              email: app.email,
              topic: "FLIP Enrollment Paid",
              message: `New FLIP enrollment confirmed.\nTrack: ${app.preferred_track}\nReference: ${reference}\nAmount: ${tx.currency} ${(tx.amount / 100).toFixed(2)}`,
            },
          }),
        });
      } catch (e) {
        console.error("notify failed:", e);
      }
    }

    return new Response(
      JSON.stringify({ paid: true, application_id: app.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("verify-flip-payment error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});