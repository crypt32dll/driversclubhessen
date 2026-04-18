import { apiClient } from "@/lib/api/client";
import { logger } from "@/lib/logger";
import { validators } from "@/lib/validators/content";
import { REVALIDATE_TAGS } from "@/lib/strapi/isr-config";
import type { Event } from "@driversclub/shared";
import { cache } from "react";

type StrapiList<T> = {
  data: T[];
};

const EVENT_LIST_QUERY = {
  "sort[0]": "createdAt:desc",
  "populate[0]": "images",
  status: "published",
} as const;

const fetchUpcomingEvents = cache(async (): Promise<Event[]> => {
  const payload = await apiClient.get<StrapiList<Record<string, unknown>>>(
    "/api/events",
    EVENT_LIST_QUERY,
    { tags: [REVALIDATE_TAGS.events] },
  );
  return validators.eventList(payload.data);
});

const fetchEventBySlug = cache(async (slug: string): Promise<Event | null> => {
  const payload = await apiClient.get<StrapiList<Record<string, unknown>>>(
    "/api/events",
    {
      "filters[slug][$eq]": slug,
      "populate[0]": "images",
      status: "published",
      "pagination[pageSize]": 1,
    },
    { tags: [REVALIDATE_TAGS.events] },
  );

  if (!payload.data[0]) return null;
  return validators.event(payload.data[0]);
});

export const eventService = {
  async getUpcomingEvents(): Promise<Event[]> {
    try {
      return await fetchUpcomingEvents();
    } catch (err) {
      logger.warn(
        "Strapi events unavailable; returning empty list",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return [];
    }
  },

  async getEventBySlug(slug: string): Promise<Event | null> {
    return fetchEventBySlug(slug);
  },
};
