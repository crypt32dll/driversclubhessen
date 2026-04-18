import type { Gallery as PayloadGallery, Media } from "@/payload-types";
import type { GalleryItem } from "@driversclub/shared";

import { mapPayloadMediaToImage } from "@/lib/payload/map-media";

export function mapPayloadGalleryItem(doc: PayloadGallery): GalleryItem {
  const imageField = doc.image;
  const media =
    typeof imageField === "number"
      ? null
      : mapPayloadMediaToImage(imageField as Media);
  if (!media) {
    throw new Error("Gallery item missing image");
  }

  return {
    id: typeof doc.id === "number" ? doc.id : undefined,
    title: doc.title,
    uploadedAt: doc.createdAt,
    image: media,
  };
}
