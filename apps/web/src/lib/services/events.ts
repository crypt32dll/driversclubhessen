import { apiClient } from "@/lib/api/client";
import { validators } from "@/lib/validators/content";
import type { Event } from "@driversclub/shared";

type StrapiList<T> = {
  data: T[];
};

export const eventService = {
  async getUpcomingEvents(): Promise<Event[]> {
    const payload = await apiClient.get<StrapiList<Record<string, unknown>>>(
      "/api/events",
      {
        "sort[0]": "createdAt:desc",
        "populate[0]": "images",
        status: "published",
      },
    );
    return validators.eventList(payload.data);
  },

  async getEventBySlug(slug: string): Promise<Event | null> {
    const payload = await apiClient.get<StrapiList<Record<string, unknown>>>(
      "/api/events",
      {
        "filters[slug][$eq]": slug,
        "populate[0]": "images",
        status: "published",
        "pagination[pageSize]": 1,
      },
    );

    if (!payload.data[0]) return null;
    return validators.event(payload.data[0]);
  },
};
