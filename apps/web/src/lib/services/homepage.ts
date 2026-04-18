import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import { validators } from "@/lib/validators/content";
import {
  type HomepageLayoutView,
  defaultHomepageLayoutView,
} from "@driversclub/shared";
import { unstable_cache } from "next/cache";

export type HomepageBundle = {
  layout: HomepageLayoutView;
};

const loadHomepageBundle = unstable_cache(
  async (): Promise<HomepageBundle> => {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "homepage",
      depth: 2,
    });
    const layout = validators.homepageLayout(doc) ?? defaultHomepageLayoutView;
    return { layout };
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
      return { layout: defaultHomepageLayoutView };
    }
  },
};
