/**
 * Cloudflare Worker: Newsletter Subscribe Proxy
 *
 * Keeps the Buttondown API key server-side.
 * Deploy: npx wrangler deploy api/subscribe-worker.ts --name newsletter-subscribe
 *
 * Environment variable (set via wrangler secret):
 *   BUTTONDOWN_API_KEY
 *
 * After deploying, set NEXT_PUBLIC_SUBSCRIBE_API_URL in your site build
 * to the worker URL (e.g. https://newsletter-subscribe.<your-subdomain>.workers.dev/subscribe)
 */

export interface Env {
  BUTTONDOWN_API_KEY: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://agenticdatastack.org",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: CORS_HEADERS,
      });
    }

    try {
      const { email } = (await request.json()) as { email?: string };

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return Response.json(
          { error: "Valid email address required." },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      const res = await fetch(
        "https://api.buttondown.com/v1/subscribers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
          },
          body: JSON.stringify({ email_address: email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        return Response.json(
          { ok: true, message: "Subscribed successfully." },
          { status: 200, headers: CORS_HEADERS }
        );
      }

      // Buttondown returns 400 for already-subscribed, etc.
      return Response.json(
        { error: (data as Record<string, unknown>).detail || "Subscription failed." },
        { status: res.status, headers: CORS_HEADERS }
      );
    } catch {
      return Response.json(
        { error: "Internal server error." },
        { status: 500, headers: CORS_HEADERS }
      );
    }
  },
};
