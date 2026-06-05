import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

    let subject = "";
    let body = "";

    if (type === "contact") {
      subject = `New contact form submission`;
      body = `Contact submission received at ${new Date().toISOString()}`;
    } else if (type === "newsletter") {
      subject = `New newsletter subscriber`;
      body = `Newsletter subscription received at ${new Date().toISOString()}`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid notification type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log only generic, non-user-controlled metadata to avoid log pollution / PII leakage.
    console.log(`[NOTIFICATION] type=${type}`);

    return new Response(
      JSON.stringify({ success: true, message: "Notification processed" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process notification" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
