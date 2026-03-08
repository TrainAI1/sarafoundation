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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let subject = "";
    let body = "";

    if (type === "contact") {
      subject = `New Contact Form: ${data.topic || "General Inquiry"} from ${data.first_name} ${data.last_name}`;
      body = `
New contact form submission received:

Name: ${data.first_name} ${data.last_name}
Email: ${data.email}
Topic: ${data.topic || "General Inquiry"}

Message:
${data.message}

---
Submitted at: ${new Date().toISOString()}
View in admin panel: ${SUPABASE_URL ? "Check your admin dashboard" : "N/A"}
      `.trim();
    } else if (type === "newsletter") {
      subject = `New Newsletter Subscriber: ${data.email}`;
      body = `
A new user has subscribed to the newsletter:

Email: ${data.email}
Subscribed at: ${new Date().toISOString()}

Total subscribers can be viewed in the admin panel.
      `.trim();
    } else {
      return new Response(JSON.stringify({ error: "Invalid notification type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log the notification (actual email sending requires an email service)
    console.log(`[NOTIFICATION] ${subject}`);
    console.log(`[NOTIFICATION BODY] ${body}`);

    // Use Lovable AI to generate a summary for logging
    const response = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "user",
            content: `Summarize this notification in one sentence for a log entry: ${subject} - ${body}`,
          },
        ],
        max_tokens: 100,
      }),
    });

    let summary = subject;
    if (response.ok) {
      const aiResult = await response.json();
      summary = aiResult.choices?.[0]?.message?.content || subject;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notification processed", summary }),
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
