import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
serve(() => {
  const env = Object.fromEntries(
    Object.entries(Deno.env.toObject()).map(([k, v]) => {
      if (k.includes("KEY") || k.includes("SECRET") || k.includes("TOKEN") || k.includes("URL")) {
        return [k, typeof v === "string" ? `${v.slice(0, 12)}...(${v.length})` : v];
      }
      return [k, v];
    })
  );
  return new Response(JSON.stringify(env, null, 2), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
});