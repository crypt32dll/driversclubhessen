import { logger } from "@/lib/logger";
import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { getPayloadClient } from "@/lib/payload/get-payload";
import { validators } from "@/lib/validators/content";
import type { Gallery as PayloadGalleryRow } from "@/payload-types";
import type { GalleryItem } from "@driversclub/shared";
import { unstable_cache } from "next/cache";

const loadGallery = unstable_cache(
  async (): Promise<GalleryItem[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "galleries",
      sort: "-createdAt",
      depth: 2,
      limit: 200,
    });
    return validators.galleryList(res.docs as PayloadGalleryRow[]);
  },
  ["cms-gallery-list"],
  {
    tags: [REVALIDATE_TAGS.gallery],
    revalidate: CMS_ISR_SECONDS,
  },
);

export const galleryService = {
  async getGalleryItems(): Promise<GalleryItem[]> {
    try {
      return await loadGallery();
    } catch (err) {
      logger.warn(
        "Payload gallery unavailable; returning empty list. Check DATABASE_URL and published galleries.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return [];
    }
  },
};
