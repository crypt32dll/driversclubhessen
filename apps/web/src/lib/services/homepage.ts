import { apiClient } from "@/lib/api/client";
import { REVALIDATE_TAGS } from "@/lib/strapi/isr-config";
import { validators } from "@/lib/validators/content";
import type { Homepage } from "@driversclub/shared";
import { cache } from "react";

type StrapiSingle<T> = {
  data: T;
};

const fallbackHomepage: Homepage = {
  heroEyebrow: "Mi Familia & Friends praesentiert",
  heroTitleLine1: "Tuning",
  heroTitleLine2: "Treffen",
  heroDateLabel: "19 · 04 · 2026",
  featuredEventText: "Sonntag · 12:00 - 20:00 · Birstein",
  heroCountdownEnd: "2026-04-19T12:00:00",
};

/**
 * Strapi 5 REST: explicit populate for single type + dynamic zone (reliable on Vercel build).
 * @see https://docs.strapi.io/cms/api/rest/guides/understanding-populate#populate-dynamic-zones
 */
const HOMEPAGE_STRAPI_QUERY = {
  "populate[hero]": "*",
  "populate[featuredEvent]": "*",
  "populate[sections][on][homepage.section-item]": "true",
  status: "published",
} as const;

const loadHomepage = cache(async (): Promise<Homepage> => {
  const payload = await apiClient.get<StrapiSingle<Record<string, unknown>>>(
    "/api/homepage",
    HOMEPAGE_STRAPI_QUERY,
    { tags: [REVALIDATE_TAGS.homepage] },
  );
  return validators.homepage(payload.data);
});

export const homepageService = {
  async getHomepage(): Promise<Homepage> {
    try {
      return await loadHomepage();
    } catch {
      return fallbackHomepage;
    }
  },
};
