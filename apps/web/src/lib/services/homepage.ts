import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import { validators } from "@/lib/validators/content";
import {
  type HomepageLayoutView,
  defaultHomepageLayoutView,
} from "@driversclub/shared";
import { unstable_cache } from "next/cache";

export type HomepageMarketingSeo = {
  homeMetaTitle?: string;
  homeMetaDescription?: string;
  eventsIndexMetaTitle?: string;
  eventsIndexMetaDescription?: string;
  galleryMetaTitle?: string;
  galleryMetaDescription?: string;
};

export type HomepageBundle = {
  layout: HomepageLayoutView;
  marketingSeo: HomepageMarketingSeo;
};

function pickMarketingSeoFromHomepageDoc(doc: unknown): HomepageMarketingSeo {
  if (!doc || typeof doc !== "object") return {};
  const d = doc as Record<string, unknown>;
  const pick = (key: string): string | undefined => {
    const v = d[key];
    if (typeof v !== "string") return undefined;
    const t = v.trim();
    return t.length > 0 ? t : undefined;
  };
  return {
    homeMetaTitle: pick("homeMetaTitle"),
    homeMetaDescription: pick("homeMetaDescription"),
    eventsIndexMetaTitle: pick("eventsIndexMetaTitle"),
    eventsIndexMetaDescription: pick("eventsIndexMetaDescription"),
    galleryMetaTitle: pick("galleryMetaTitle"),
    galleryMetaDescription: pick("galleryMetaDescription"),
  };
}

const loadHomepageBundle = unstable_cache(
  async (): Promise<HomepageBundle> => {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "homepage",
      depth: 2,
    });
    const layout = validators.homepageLayout(doc) ?? defaultHomepageLayoutView;
    return {
      layout,
      marketingSeo: pickMarketingSeoFromHomepageDoc(doc),
    };
  },
  ["cms-homepage"],
  {
    tags: [REVALIDATE_TAGS.homepage],
    revalidate: CMS_ISR_SECONDS,
  },
);

export const homepageService = {
  async getHomepageBundle(): Promise<HomepageBundle> {
    try {
      return await loadHomepageBundle();
    } catch (err) {
      logger.warn(
        "Payload homepage unavailable; using default block layout. Check DATABASE_URL, PAYLOAD_SECRET, and ISR cache.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return { layout: defaultHomepageLayoutView, marketingSeo: {} };
    }
  },
};
