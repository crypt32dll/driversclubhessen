import { type NeonQueryFunction, neon } from "@neondatabase/serverless";

import { normalizePostgresUrlForNodePg } from "../postgres-url.ts";

/**
 * Raw SQL via Neon's serverless driver (HTTP/WebSockets), as in Neon's Next.js guide.
 * Payload CMS still uses `@payloadcms/db-postgres` + `DATABASE_URL` separately; use this only
 * when you intentionally want `neon`-style queries (e.g. Server Actions outside Payload).
 *
 * @see https://neon.com/docs/serverless/serverless-driver
 */
export function getNeonSql(): NeonQueryFunction<false, false> {
  const url = normalizePostgresUrlForNodePg(
    process.env.DATABASE_URL ??
      process.env.DATABASE_URI ??
      process.env.POSTGRES_URL ??
      "",
  );
  if (!url.trim()) {
    throw new Error(
      "Missing DATABASE_URL (or DATABASE_URI / POSTGRES_URL) for Neon serverless SQL.",
    );
  }
  return neon(url);
}
