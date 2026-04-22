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
      .from("cap_applications")
      .select("id, email, full_name, payment_status, payment_plan, paid_amount, installments_completed, total_amount, preferred_track")
      .eq("paystack_reference", reference)
      .maybeSingle();

    if (!app) {
      return new Response(JSON.stringify({ error: "Application not found for this reference" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (tx.status !== "success") {
      return new Response(JSON.stringify({ success: false, status: tx.status }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Idempotency guard: if this transaction already pushed the record forward, return current state
    if (app.payment_status === "paid") {
      return new Response(
        JSON.stringify({ success: true, fully_paid: true, installments_completed: app.installments_completed }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const newPaidAmount = (app.paid_amount || 0) + tx.amount;
    const total = app.total_amount || 0;
    let newInstallments = app.installments_completed;
    if (app.payment_plan === "installments") newInstallments += 1;

    const fullyPaid =
      app.payment_plan === "full" ||
      (app.payment_plan === "installments" && newInstallments >= 3) ||
      (total > 0 && newPaidAmount >= total);

    const updates: Record<string, any> = {
      paid_amount: newPaidAmount,
      installments_completed: newInstallments,
      paystack_reference: null, // clear so next installment generates a fresh ref
    };
    if (fullyPaid) {
      updates.payment_status = "paid";
      updates.paid_at = new Date().toISOString();
    }

    await supabase.from("cap_applications").update(updates).eq("id", app.id);

    // Notify admin (fire-and-forget)
    try {
      const installmentLabel = app.payment_plan === "installments"
        ? ` (Installment ${newInstallments} of 3)`
        : "";
      const status = fullyPaid ? "FULLY PAID" : "Installment received";
      await fetch(`${SUPABASE_URL}/functions/v1/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({
          type: "contact",
          data: {
            first_name: app.full_name?.split(" ")[0] || "CAP",
            last_name: app.full_name?.split(" ").slice(1).join(" ") || "Applicant",
            email: app.email,
            topic: `CAP Cohort 3 — ${status}`,
            message: `${status}${installmentLabel}\nTrack: ${app.preferred_track}\nReference: ${reference}\nAmount: ${tx.currency} ${(tx.amount / 100).toFixed(2)}\nTotal paid so far: ${tx.currency} ${(newPaidAmount / 100).toFixed(2)}`,
          },
        }),
      });
    } catch (e) {
      console.error("notify failed:", e);
    }

    return new Response(
      JSON.stringify({
        success: true,
        fully_paid: fullyPaid,
        installments_completed: newInstallments,
        application_id: app.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("verify-cap-payment error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});