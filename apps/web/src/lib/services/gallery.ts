import { apiClient } from "@/lib/api/client";
import { validators } from "@/lib/validators/content";
import { REVALIDATE_TAGS } from "@/lib/strapi/isr-config";
import type { GalleryItem } from "@driversclub/shared";

type StrapiList<T> = {
  data: T[];
};

export const galleryService = {
  async getGalleryItems(): Promise<GalleryItem[]> {
    const payload = await apiClient.get<StrapiList<Record<string, unknown>>>(
      "/api/galleries",
      {
        "sort[0]": "uploadedAt:desc",
        "populate[0]": "image",
      },
      { tags: [REVALIDATE_TAGS.gallery] },
    );
    return validators.galleryList(payload.data);
  },
};
