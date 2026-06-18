import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

// Single source of truth for the displayed version (matches juge.ca's footer).
const version = (() => {
  try {
    return readFileSync("./VERSION", "utf8").trim();
  } catch {
    return "0.0.0";
  }
})();

// Vercel injects git + deployment metadata at build time.
const deployUrl =
  process.env.VERCEL_BRANCH_URL ??
  process.env.VERCEL_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "rubiconnexus.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A parent-directory lockfile exists; pin the tracing root to this project.
  outputFileTracingRoot: projectRoot,
  env: {
    APP_VERSION: version,
    BUILD_TIME: new Date().toISOString(),
    COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? "local-dev",
    COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF ?? "local",
    DEPLOY_URL: deployUrl,
  },
};

export default nextConfig;
