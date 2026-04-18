/**
 * Next.js Data Cache tags for Payload-backed reads. Use with `revalidateTag()` from
 * `/api/revalidate` (webhooks / Payload hooks) for on-demand ISR; time-based `revalidate` remains a fallback.
 */
export const REVALIDATE_TAGS = {
  homepage: "cms:homepage",
  events: "cms:events",
  gallery: "cms:gallery",
  navigation: "cms:navigation",
  legalImpressum: "cms:legal-impressum",
  legalDatenschutz: "cms:legal-datenschutz",
  cookieBanner: "cms:cookie-banner",
} as const;

/**
 * Default time-based revalidation (seconds) when webhooks are unavailable.
 * Prefer `CMS_ISR_REVALIDATE_SECONDS`; `STRAPI_ISR_REVALIDATE_SECONDS` is still read for older envs.
 */
export function parseCmsIsrRevalidateSeconds(): number {
  const raw =
    process.env.CMS_ISR_REVALIDATE_SECONDS ??
    process.env.STRAPI_ISR_REVALIDATE_SECONDS ??
    "3600";
  return Math.max(60, Number.parseInt(raw, 10) || 3600);
}

export const CMS_ISR_SECONDS = parseCmsIsrRevalidateSeconds();

/** @deprecated Use CMS_ISR_SECONDS */
export const STRAPI_ISR_SECONDS = CMS_ISR_SECONDS;

/**
 * Next.js 16+ `revalidateTag(tag, profile)` requires a cache profile.
 * Matches `cacheLife.cms` in `next.config.ts`.
 */
export const REVALIDATE_TAG_PROFILE = "cms" as const;
