import { NextResponse } from "next/server";

// Email capture for the Wealth Enablement Network.
//
// Storage is provider-agnostic. If RESEND_API_KEY + RESEND_AUDIENCE_ID are set
// (see docs/monetization-plan.md), subscribers are added to a Resend audience so
// they can be emailed (founder notes, venture opportunities, AI updates). If no
// provider is configured yet, the signup is logged so the lead is recoverable
// from Vercel runtime logs and the form still works end-to-end.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (apiKey && audienceId) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });

      // 409 = already a contact; treat as success (idempotent signup).
      if (!res.ok && res.status !== 409) {
        console.error("[subscribe] resend error", res.status, await res.text());
        return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
      }
    } catch (err) {
      console.error("[subscribe] resend exception", err);
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }
  } else {
    console.log(`[subscribe] new signup (no email provider configured yet): ${email}`);
  }

  return NextResponse.json({ ok: true });
}
