import { apiClient } from "@/lib/api/client";
import { validators } from "@/lib/validators/content";
import type { Homepage } from "@driversclub/shared";

type StrapiSingle<T> = {
  data: T;
};

const fallbackHomepage: Homepage = {
  heroEyebrow: "Mi Familia & Friends praesentiert",
  heroTitleLine1: "Tuning",
  heroTitleLine2: "Treffen",
  heroDateLabel: "19 · 04 · 2026",
  featuredEventText: "Sonntag · 12:00 - 20:00 · Birstein",
};

export const homepageService = {
  async getHomepage(): Promise<Homepage> {
    try {
      const payload = await apiClient.get<
        StrapiSingle<Record<string, unknown>>
      >("/api/homepage", {
        "populate[0]": "hero",
        "populate[1]": "featuredEvent",
        "populate[2]": "sections",
        status: "published",
      });
      return validators.homepage(payload.data);
    } catch {
      return fallbackHomepage;
    }
  },
};
