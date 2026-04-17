/**
 * Runs `next` with NEXT_PUBLIC_STRAPI_URL normalized (bare host → https://…)
 * so Vercel env values match what `new URL()` and fetch expect at build time.
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { normalizePublicStrapiUrl } = require("./strapi-public-url.cjs");

const raw = process.env.NEXT_PUBLIC_STRAPI_URL;
const normalized = normalizePublicStrapiUrl(raw);
if (normalized && normalized !== String(raw).trim()) {
  process.env.NEXT_PUBLIC_STRAPI_URL = normalized;
  process.stderr.write(
    `[web:build] Normalized NEXT_PUBLIC_STRAPI_URL to ${normalized}\n`,
  );
}

const nextEntry = path.join(
  path.dirname(require.resolve("next/package.json")),
  "dist/bin/next",
);

const args = process.argv.slice(2);
const result = spawnSync(process.execPath, [nextEntry, ...args], {
  stdio: "inherit",
  env: process.env,
});

process.exit(result.status ?? 1);
