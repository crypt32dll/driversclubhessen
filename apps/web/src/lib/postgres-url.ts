/**
 * `pg` / `pg-connection-string` warns when `sslmode` is `require`, `prefer`, or `verify-ca`
 * (they are treated like `verify-full` today; future pg v9 will follow libpq semantics instead).
 *
 * For Neon-hosted URLs, set **`sslmode=verify-full`** explicitly so behavior stays strict and the
 * dev-server warning goes away. Non-Neon URLs are left unchanged (e.g. local Docker).
 *
 * Alternative if you need libpq semantics today: add `uselibpqcompat=true&sslmode=require` to the URL.
 *
 * @see https://www.postgresql.org/docs/current/libpq-ssl.html
 */
export function normalizePostgresUrlForNodePg(url: string): string {
  if (!url.trim()) return url;
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
