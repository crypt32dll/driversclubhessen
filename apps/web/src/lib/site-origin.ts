/**
 * Canonical public origin for absolute links (ICS, calendar URLs, metadata).
 * Mirrors `metadataBase` in `app/(marketing)/layout.tsx`.
 */
export function getMarketingSiteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  if (raw) {
    try {
      const normalized = raw.startsWith("http") ? raw : `https://${raw}`;
      return new URL(normalized).origin;
    } catch {
      /* fall through */
    }
  }
  return "http://localhost:3000";
}
