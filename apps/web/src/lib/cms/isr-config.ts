/**
 * Next.js Data Cache tags for Payload-backed reads. On-demand: `POST /api/revalidate`
 * uses `revalidateTag(tag, 'max')`; Payload `afterChange` hooks use `{ expire: 0 }`
 * so author saves are never stuck behind stale-while-revalidate. Time-based
 * `unstable_cache` `revalidate` remains the fallback TTL.
 */
export const REVALIDATE_TAGS = {
  homepage: "cms:homepage",
  events: "cms:events",
  gallery: "cms:gallery",
  navigation: "cms:navigation",
  communityFaq: "cms:community-faq",
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

/** Next.js 16 recommended profile for Route Handler / webhook revalidation (SWR background refresh). */
export const REVALIDATE_TAG_PROFILE_MAX = "max" as const;

/**
 * Immediate tag expiry — use when an author mutation just wrote to the DB (Payload
 * hooks). `max` keeps serving stale briefly; editors expect the next paint to reflect
 * the save.
 */
export const REVALIDATE_TAG_IMMEDIATE_EXPIRE = { expire: 0 } as const;
