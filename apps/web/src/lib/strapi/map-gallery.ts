import type { GalleryItem } from "@driversclub/shared";

import {
  mapStrapiMediaToImage,
  unwrapStrapiRelationData,
} from "@/lib/strapi/map-media";

function flattenStrapiEntry(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  const o = raw as Record<string, unknown>;
  if (o.attributes && typeof o.attributes === "object") {
    return { ...o, ...(o.attributes as Record<string, unknown>) };
  }
  return o;
}

export function mapStrapiGalleryItemFromRest(raw: unknown): GalleryItem {
  const r = flattenStrapiEntry(raw);
  const title = String(r.title ?? "");
  const uploadedAt = typeof r.uploadedAt === "string" ? r.uploadedAt : "";

  const imageField = r.image;
  let imageRecord: Record<string, unknown> | undefined;

  if (imageField && typeof imageField === "object") {
    const obj = imageField as Record<string, unknown>;
    if ("data" in obj && obj.data !== null && obj.data !== undefined) {
      const inner = unwrapStrapiRelationData<Record<string, unknown>>(obj);
      imageRecord = inner[0];
    } else {
      imageRecord = obj;
    }
  }

  const mapped = imageRecord ? mapStrapiMediaToImage(imageRecord) : null;
  if (!mapped) {
    throw new Error("Gallery item missing image");
  }

  return {
    id: typeof r.id === "number" ? r.id : undefined,
    documentId: typeof r.documentId === "string" ? r.documentId : undefined,
    title,
    uploadedAt,
    image: mapped,
  };
}
