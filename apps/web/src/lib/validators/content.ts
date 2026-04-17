import {
  eventSchema,
  galleryItemSchema,
  homepageSchema,
} from "@driversclub/shared";
import { z } from "zod";

import { mapStrapiEventFromRest } from "@/lib/strapi/map-event";
import { mapStrapiGalleryItemFromRest } from "@/lib/strapi/map-gallery";

const eventListSchema = z.array(eventSchema);
const galleryListSchema = z.array(galleryItemSchema);

export const validators = {
  eventList: (value: unknown) => {
    const rows = Array.isArray(value) ? value : [];
    return eventListSchema.parse(rows.map(mapStrapiEventFromRest));
  },
  event: (value: unknown) => eventSchema.parse(mapStrapiEventFromRest(value)),
  galleryList: (value: unknown) => {
    const rows = Array.isArray(value) ? value : [];
    return galleryListSchema.parse(rows.map(mapStrapiGalleryItemFromRest));
  },
  homepage: (value: unknown) => homepageSchema.parse(value),
};
