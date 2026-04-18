import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import { validators } from "@/lib/validators/content";
import type { Navigation as PayloadNavigation } from "@/payload-types";
import type { SiteNavItem, SiteNavigation } from "@driversclub/shared";
import { unstable_cache } from "next/cache";

const DEFAULT_NAV_ITEMS: readonly SiteNavItem[] = [
  { href: "/#aktuell", label: "Aktuell" },
  { href: "/#about", label: "Über uns" },
  { href: "/#location", label: "Anfahrt" },
  { href: "/#social", label: "Social" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Galerie" },
] as const;

const loadNavigation = unstable_cache(
  async (): Promise<SiteNavigation> => {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "navigation",
      depth: 0,
    });
    return validators.navigation(doc as PayloadNavigation);
  },
  ["cms-navigation"],
  {
    tags: [REVALIDATE_TAGS.navigation],
    revalidate: CMS_ISR_SECONDS,
  },
);

export const navigationService = {
  async getSiteNavigation(): Promise<SiteNavigation> {
    try {
      const nav = await loadNavigation();
      if (nav.items.length > 0) return nav;
      return { items: [...DEFAULT_NAV_ITEMS] };
    } catch (err) {
      logger.warn(
        "Payload navigation unavailable; using default links.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return { items: [...DEFAULT_NAV_ITEMS] };
    }
  },
};
