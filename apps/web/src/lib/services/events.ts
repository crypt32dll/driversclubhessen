import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import { validators } from "@/lib/validators/content";
import type { Event as PayloadEventDoc } from "@/payload-types";
import type { Event } from "@driversclub/shared";
import { unstable_cache } from "next/cache";

function todayIsoDate(): string {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Event `date` is compared by calendar day (YYYY-MM-DD prefix). */
function isEventOnOrAfterToday(dateIso: string): boolean {
  const day = dateIso.slice(0, 10);
  if (day.length !== 10) return true;
  return day >= todayIsoDate();
}

function sortEventsByDateAsc(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    const da = a.date.slice(0, 10);
    const db = b.date.slice(0, 10);
    if (da !== db) return da.localeCompare(db);
    return a.slug.localeCompare(b.slug);
  });
}

function filterUpcomingSorted(events: Event[]): Event[] {
  return sortEventsByDateAsc(
    events.filter((e) => isEventOnOrAfterToday(e.date)),
  );
}

const fetchEventsFromCms = unstable_cache(
  async (): Promise<Event[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "events",
      sort: "date",
      /** List cards need populated media + hero group; avoid deeper relation graphs. */
      depth: 1,
      limit: 200,
    });
    return validators.eventList(res.docs as PayloadEventDoc[]);
  },
  ["cms-events-list"],
  {
    tags: [REVALIDATE_TAGS.events],
    revalidate: CMS_ISR_SECONDS,
  },
);

function fetchEventBySlugCached(slug: string) {
  return unstable_cache(
    async (): Promise<Event | null> => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "events",
        where: { slug: { equals: slug } },
        /** Detail: nested hero CTAs + gallery media. */
        depth: 2,
        limit: 1,
      });
      const row = res.docs[0];
      if (!row) return null;
      return validators.event(row as PayloadEventDoc);
    },
    ["cms-event", slug],
    {
      tags: [REVALIDATE_TAGS.events],
      revalidate: CMS_ISR_SECONDS,
    },
  );
}

async function loadUpcomingEvents(): Promise<Event[]> {
  const all = await fetchEventsFromCms();
  return filterUpcomingSorted(all);
}

export const eventService = {
  /**
   * Upcoming events (today or later), sorted by date ascending — first entry is the “next” event for the homepage hero.
   */
  async getUpcomingEvents(): Promise<Event[]> {
    try {
      return await loadUpcomingEvents();
    } catch (err) {
      logger.warn(
        "Payload events unavailable; returning empty list. Check DATABASE_URL, published events, and ISR cache.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return [];
    }
  },

  async getNextUpcomingEvent(): Promise<Event | null> {
    try {
      const list = await loadUpcomingEvents();
      return list[0] ?? null;
    } catch (err) {
      logger.warn(
        "Payload events unavailable; next event unknown.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return null;
    }
  },

  async getEventBySlug(slug: string): Promise<Event | null> {
    return fetchEventBySlugCached(slug)();
  },

  /**
   * All event slugs for `generateStaticParams` (build + ISR paths).
   * Lightweight query — no `unstable_cache` so build picks current CMS slugs.
   */
  async getPublishedEventSlugs(): Promise<string[]> {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "events",
      sort: "date",
      depth: 0,
      limit: 500,
    });
    return res.docs
      .map((d) => (typeof d.slug === "string" ? d.slug : null))
      .filter((s): s is string => Boolean(s && s.length > 0));
  },
};
