/**
 * Runs `next` with optional `NEXT_PUBLIC_APP_URL` normalization (bare host → https://…).
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");

function normalizeAppUrl(raw) {
  if (raw === undefined || raw === null) return null;
  const t = String(raw).trim();
  if (!t) return null;
  if (t.startsWith("http://") || t.startsWith("https://")) {
    return t.replace(/\/$/, "");
  }
  return `https://${t}`.replace(/\/$/, "");
}

const rawApp = process.env.NEXT_PUBLIC_APP_URL;
const normalized = normalizeAppUrl(rawApp);
if (normalized && normalized !== String(rawApp).trim()) {
  process.env.NEXT_PUBLIC_APP_URL = normalized;
  process.stderr.write(
    `[web:build] Normalized NEXT_PUBLIC_APP_URL to ${normalized}\n`,
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
