#!/usr/bin/env node
/**
 * Quick check that DATABASE_URL works with @neondatabase/serverless (Neon guide step 3+).
 *
 * Loads `.env.development.local` then `.env.local` from apps/web (simple KEY=VALUE lines).
 * Run from apps/web: `npm run neon:check`
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { neon } from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");

function loadEnvFile(name) {
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

/** Same logic as `src/lib/postgres-url.ts` — keep in sync (plain Node, no TS import). */
function normalizePostgresUrlForNodePg(url) {
  if (!String(url).trim()) return url;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const looksLikeNeon =
      host.endsWith(".neon.tech") ||
      host.endsWith(".neon.build") ||
      host.includes(".neon.tech");
    if (!looksLikeNeon) return url;
    const mode = (parsed.searchParams.get("sslmode") ?? "").toLowerCase();
    if (
      mode === "require" ||
      mode === "prefer" ||
      mode === "verify-ca" ||
      mode === ""
    ) {
      parsed.searchParams.set("sslmode", "verify-full");
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

const url = normalizePostgresUrlForNodePg(
  process.env.DATABASE_URL ??
    process.env.DATABASE_URI ??
    process.env.POSTGRES_URL ??
    "",
);

if (!url.trim()) {
  console.error(
    "[neon:check] No DATABASE_URL. Run: vercel env pull .env.development.local (from apps/web), or set DATABASE_URL in .env.local",
  );
  process.exit(1);
}

const sql = neon(url);

const rows = await sql`SELECT 1 AS ok`;
console.log("[neon:check] OK — Neon responded:", rows);
process.exit(0);
