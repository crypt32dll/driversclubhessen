import { apiClient } from "@/lib/api/client";
import { REVALIDATE_TAGS } from "@/lib/strapi/isr-config";
import { validators } from "@/lib/validators/content";
import type { GalleryItem } from "@driversclub/shared";
import { cache } from "react";

type StrapiList<T> = {
  data: T[];
};

const GALLERY_LIST_QUERY = {
  "sort[0]": "uploadedAt:desc",
  "populate[0]": "image",
} as const;

const loadGallery = cache(async (): Promise<GalleryItem[]> => {
  const payload = await apiClient.get<StrapiList<Record<string, unknown>>>(
    "/api/galleries",
    GALLERY_LIST_QUERY,
    { tags: [REVALIDATE_TAGS.gallery] },
  );
  return validators.galleryList(payload.data);
});

export const galleryService = {
  async getGalleryItems(): Promise<GalleryItem[]> {
    return loadGallery();
  },
};
