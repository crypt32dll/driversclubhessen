/**
 * Next.js Data Cache tags for Strapi-backed `fetch()` calls. Use with `revalidateTag()` from
 * `/api/revalidate` (Strapi webhooks) for on-demand ISR; time-based `revalidate` remains a fallback.
 */
export const REVALIDATE_TAGS = {
  homepage: "strapi:homepage",
  events: "strapi:events",
  gallery: "strapi:gallery",
} as const;

/**
 * Default time-based revalidation (seconds) when Strapi webhooks are unavailable.
 * Override with `STRAPI_ISR_REVALIDATE_SECONDS` (e.g. 3600).
 */
export const STRAPI_ISR_SECONDS = (() => {
  const n = Number.parseInt(
    process.env.STRAPI_ISR_REVALIDATE_SECONDS ?? "3600",
    10,
  );
  return Number.isFinite(n) && n >= 60 ? n : 3600;
})();
