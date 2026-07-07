import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const WAIVER_CODE = "TRAINFREE456";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const body = await req.json();
    const {
      waiver_code,
      full_name, email, phone, country,
      university, year_of_study,
      preferred_track, specialization, motivation, referral_source,
    } = body || {};

    if (!waiver_code || String(waiver_code).trim().toUpperCase() !== WAIVER_CODE) {
      return new Response(JSON.stringify({ error: "Invalid waiver code" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const required = { full_name, email, phone, country, university, year_of_study, preferred_track };
    for (const [k, v] of Object.entries(required)) {
      if (!v || typeof v !== "string" || !v.trim()) {
        return new Response(JSON.stringify({ error: `Missing field: ${k}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data, error } = await supabase
      .from("cap_applications")
      .insert({
        full_name: String(full_name).trim().slice(0, 200),
        email: String(email).trim().slice(0, 255),
        phone: String(phone).trim().slice(0, 30),
        country: String(country).trim().slice(0, 100),
        university: String(university).trim().slice(0, 200),
        year_of_study: String(year_of_study),
        preferred_track: String(preferred_track),
        specialization: specialization ? String(specialization).slice(0, 100) : null,
        motivation: motivation ? String(motivation).slice(0, 2000) : null,
        referral_source: referral_source ? String(referral_source).slice(0, 100) : null,
        payment_plan: "waiver",
        payment_status: "paid",
        paid_amount: 0,
        total_amount: 0,
        partner_code: WAIVER_CODE,
        status_notes: "Partner waiver code used — fee waived",
        paid_at: new Date().toISOString(),
      } as any)
      .select("id")
      .single();

    if (error) {
      console.error("waiver insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      await fetch(`${SUPABASE_URL}/functions/v1/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SERVICE_KEY}` },
        body: JSON.stringify({
          type: "contact",
          data: {
            first_name: String(full_name).split(" ")[0] || "CAP",
            last_name: String(full_name).split(" ").slice(1).join(" ") || "Applicant",
            email,
            topic: "CAP Cohort 3 — Waiver Enrollment",
            message: `Partner waiver code used.\nTrack: ${preferred_track}\nUniversity: ${university}\nCountry: ${country}`,
          },
        }),
      });
    } catch (e) { console.error("notify failed:", e); }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-cap-waiver error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});