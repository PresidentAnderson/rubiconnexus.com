// Deployment provenance, rendered in the footer in the same format as juge.ca:
//   Version 1.3.0 | Build a1b2c3d | Branch master | Built 18 Jun 2026, 8:45 a.m. EDT
// Values are injected by next.config.mjs (read from VERSION + Vercel git env vars).

export type BuildInfo = {
  version: string;
  commit: string;
  commitShort: string;
  branch: string;
  deployUrl: string;
  deployHref: string;
  builtAt: string;
  builtLabel: string;
};

export function getBuildInfo(): BuildInfo {
  const version = process.env.APP_VERSION ?? "0.0.0";
  const commit = process.env.COMMIT_SHA ?? "local-dev";
  const branch = process.env.COMMIT_REF ?? "local";
  const deployUrl = process.env.DEPLOY_URL ?? "richereverydayineveryway.com";
  const builtAt = process.env.BUILD_TIME ?? new Date().toISOString();

  const parsed = new Date(builtAt);
  // Note: dateStyle/timeStyle cannot be combined with timeZoneName (Node's ICU
  // throws), so use explicit components instead.
  const builtLabel = Number.isNaN(parsed.getTime())
    ? builtAt
    : parsed.toLocaleString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Toronto",
        timeZoneName: "short",
      });

  return {
    version,
    commit,
    commitShort: commit.slice(0, 7),
    branch,
    deployUrl,
    deployHref: `https://${deployUrl}`,
    builtAt,
    builtLabel,
  };
}
