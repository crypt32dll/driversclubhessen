import {
  eventSchema,
  galleryItemSchema,
  homepageLayoutViewSchema,
  siteNavigationSchema,
} from "@driversclub/shared";
import { z } from "zod";

import { mapPayloadEvent } from "@/lib/payload/map-event";
import { mapPayloadGalleryItem } from "@/lib/payload/map-gallery";
import { mapPayloadHomepageLayout } from "@/lib/payload/map-homepage-layout";
import { mapPayloadNavigation } from "@/lib/payload/map-navigation";
import type {
  Event as PayloadEvent,
  Gallery as PayloadGallery,
  Homepage as PayloadHomepage,
  Navigation as PayloadNavigation,
} from "@/payload-types";
import type { HomepageLayoutView } from "@driversclub/shared";

const eventListSchema = z.array(eventSchema);
const galleryListSchema = z.array(galleryItemSchema);

export const validators = {
  eventList: (value: unknown) => {
    const rows = Array.isArray(value) ? value : [];
    return eventListSchema.parse(
      rows.map((row) => mapPayloadEvent(row as PayloadEvent)),
    );
  },
  event: (value: unknown) =>
    eventSchema.parse(mapPayloadEvent(value as PayloadEvent)),
  galleryList: (value: unknown) => {
    const rows = Array.isArray(value) ? value : [];
    return galleryListSchema.parse(
      rows.map((row) => mapPayloadGalleryItem(row as PayloadGallery)),
    );
  },
  /** Block layout; `null` when empty — caller may substitute `defaultHomepageLayoutView`. */
  homepageLayout: (value: unknown): HomepageLayoutView | null => {
    const mapped = mapPayloadHomepageLayout(value as PayloadHomepage);
    if (!mapped) return null;
    return homepageLayoutViewSchema.parse(mapped);
  },
  navigation: (value: unknown) =>
    siteNavigationSchema.parse(
      mapPayloadNavigation(value as PayloadNavigation),
    ),
};
