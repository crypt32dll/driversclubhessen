/**
 * Canonical list of public marketing HTML routes (no `/admin`, no `/api/*`).
 * Single source for sitemap entries and tag-based revalidation (e.g. navigation).
 *
 * Not a React concern — a shared module, not a HOC (see project hooks/HOC guidelines).
 */
export const MARKETING_STATIC_PATHS = [
  "/",
  "/events",
  "/gallery",
  "/faq",
  "/legal/impressum",
  "/legal/datenschutz",
] as const;

export type MarketingStaticPath = (typeof MARKETING_STATIC_PATHS)[number];

/** Next.js MetadataRoute sitemap priority (0–1). */
export function marketingPathSitemapPriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/events") return 0.9;
  return 0.7;
}

export const SITEMAP_XML_PATH = "/sitemap.xml";
export const EVENTS_RSS_XML_PATH = "/events/rss.xml";
