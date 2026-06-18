import { NextResponse } from "next/server";

// Email capture for Rubicon Nexus.
//
// Adapters, tried in order when configured:
//  1. HubSpot — set HUBSPOT_FORM_ID (portal defaults to the Rubicon portal below,
//     override with HUBSPOT_PORTAL_ID). Posts to the HubSpot Forms submit API.
//  2. Resend  — set RESEND_API_KEY + RESEND_AUDIENCE_ID to add to an audience.
// If neither is configured the signup is logged so it's recoverable from Vercel
// runtime logs and the form still works end-to-end.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? "43986063";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown };
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const hubspotFormId = process.env.HUBSPOT_FORM_ID;
  const resendKey = process.env.RESEND_API_KEY;
  const resendAudience = process.env.RESEND_AUDIENCE_ID;

  // 1) HubSpot
  if (hubspotFormId) {
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${hubspotFormId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [{ objectTypeId: "0-1", name: "email", value: email }],
            context: { pageName: "Rubicon Nexus — Join the list" },
          }),
        }
      );
      if (!res.ok) {
        console.error("[subscribe] hubspot error", res.status, await res.text());
        return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[subscribe] hubspot exception", err);
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }
  }

  // 2) Resend
  if (resendKey && resendAudience) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${resendAudience}/contacts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (!res.ok && res.status !== 409) {
        console.error("[subscribe] resend error", res.status, await res.text());
        return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[subscribe] resend exception", err);
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }
  }

  console.log(`[subscribe] new signup (no provider configured yet): ${email}`);
  return NextResponse.json({ ok: true });
}
