import { isCmsPreviewRequest } from "@/lib/cms/cms-draft";
import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import { validators } from "@/lib/validators/content";
import type { Gallery as PayloadGalleryRow } from "@/payload-types";
import type { GalleryItem } from "@driversclub/shared";
import { unstable_cache } from "next/cache";

async function loadGalleryFromPayload(draft: boolean): Promise<GalleryItem[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "galleries",
    sort: "-createdAt",
    depth: 2,
    limit: 200,
    draft,
  });
  return validators.galleryList(res.docs as PayloadGalleryRow[]);
}

const loadGallery = unstable_cache(
  async (): Promise<GalleryItem[]> => loadGalleryFromPayload(false),
  ["cms-gallery-list"],
  {
    tags: [REVALIDATE_TAGS.gallery],
    revalidate: CMS_ISR_SECONDS,
  },
);

export const galleryService = {
  async getGalleryItems(): Promise<GalleryItem[]> {
    try {
      if (await isCmsPreviewRequest()) {
        return await loadGalleryFromPayload(true);
      }
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
