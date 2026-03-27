export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://adamstark.ai",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    try {
      const { email } = await request.json();
      if (!email) return new Response("Email required", { status: 400 });
      const res = await fetch(
        "https://api.beehiiv.com/v2/publications/pub_091d039f-fedf-47fe-bf70-622f1e8f38f1/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            reactivate_existing: false,
            send_welcome_email: true,
            utm_source: "adamstark.ai",
            utm_medium: "website",
          }),
        }
      );
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://adamstark.ai",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Failed" }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "https://adamstark.ai" },
      });
    }
  },
};
