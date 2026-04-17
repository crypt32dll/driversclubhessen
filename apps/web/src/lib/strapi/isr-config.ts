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
 *
 * Route segment `export const revalidate` cannot import this — Next.js must see
 * `process.env` in the page file. Duplicate the same logic there and keep in sync.
 */
export function parseStrapiIsrRevalidateSeconds(): number {
  return Math.max(
    60,
    Number.parseInt(process.env.STRAPI_ISR_REVALIDATE_SECONDS ?? "3600", 10) ||
      3600,
  );
}

export const STRAPI_ISR_SECONDS = parseStrapiIsrRevalidateSeconds();

/**
 * Next.js 16+ `revalidateTag(tag, profile)` requires a cache profile.
 * Matches `cacheLife.strapi` in `next.config.ts`.
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidateTag
 */
export const REVALIDATE_TAG_PROFILE = "strapi" as const;
