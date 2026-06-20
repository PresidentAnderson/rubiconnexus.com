import { NextResponse } from "next/server";

/**
 * Live-deployment version probe. Returns the commit this deployment was built
 * from (inlined at build via next.config env). The client compares it against
 * the commit baked into its own page: when they differ, a newer deployment is
 * live and the user should refresh. Never cached.
 */
export const dynamic = "force-dynamic";

const COMMIT =
  process.env.NEXT_PUBLIC_COMMIT_SHA ??
  process.env.COMMIT_SHA ??
  process.env.VERCEL_GIT_COMMIT_SHA ??
  "local-dev";

export function GET() {
  return NextResponse.json(
    { commit: COMMIT },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    },
  );
}
