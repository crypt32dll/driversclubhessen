import type { Event } from "@driversclub/shared";

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

export function mapStrapiEventFromRest(raw: unknown): Event {
  const r = flattenStrapiEntry(raw);

  const slug = String(r.slug ?? "");
  const title = String(r.title ?? "");
  const location = String(r.location ?? "");
  const dateRaw = r.date;
  const date =
    typeof dateRaw === "string"
      ? dateRaw
      : dateRaw != null
        ? new Date(String(dateRaw)).toISOString()
        : "";

  const desc = r.description;
  let description: Event["description"];
  if (typeof desc === "string") {
    description = desc;
  } else if (Array.isArray(desc)) {
    description = desc as Event["description"];
  } else {
    description = "";
  }

  const imagesRaw = unwrapStrapiRelationData<Record<string, unknown>>(r.images);
  const images = imagesRaw
    .map((img) => mapStrapiMediaToImage(img))
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return {
    id: typeof r.id === "number" ? r.id : undefined,
    documentId: typeof r.documentId === "string" ? r.documentId : undefined,
    slug,
    title,
    description,
    date,
    location,
    createdAt: typeof r.createdAt === "string" ? r.createdAt : undefined,
    images: images.length ? images : undefined,
  };
}
