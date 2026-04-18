#!/usr/bin/env npx tsx
/**
 * One-off fix after enabling Payload `versions.drafts`: legacy rows can have `_status` NULL.
 * The admin filter "Document status → Published" excludes NULL → "No results".
 *
 * Sets `_status = 'published'` where `_status` IS NULL for `events` and `galleries`.
 *
 * Loads `.env.development.local` then `.env.local` from `apps/web` (same as `seed:cms`).
 * Run: `npm run backfill:published-status --workspace web`
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { neon } from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");

function loadEnvFile(name: string) {
  const path = join(webRoot, name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (!key) continue;
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] == null || process.env[key] === "") {
      process.env[key] = val;
    }
  }
}

loadEnvFile(".env.development.local");
loadEnvFile(".env.local");

const databaseUrl =
  process.env.DATABASE_URL?.trim() ??
  process.env.DATABASE_URI?.trim() ??
  process.env.POSTGRES_URL?.trim();

if (!databaseUrl) {
  console.error("Missing DATABASE_URL (or DATABASE_URI / POSTGRES_URL).");
  process.exit(1);
}

const dbUrl = databaseUrl;

async function main() {
  const sql = neon(dbUrl);

  await sql`
    UPDATE events
    SET _status = 'published'
    WHERE _status IS NULL
  `;
  console.log("[backfill] events: UPDATE … WHERE _status IS NULL");

  await sql`
    UPDATE galleries
    SET _status = 'published'
    WHERE _status IS NULL
  `;
  console.log("[backfill] galleries: UPDATE … WHERE _status IS NULL");

  console.log(
    "[backfill] Done. Reload Payload admin; clear column filters (X) if „No results“ persists.",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
