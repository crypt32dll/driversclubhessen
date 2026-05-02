import { isCmsPreviewRequest } from "@/lib/cms/cms-draft";
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

/** Strictly before today’s calendar day (`YYYY-MM-DD` from `event.date`). */
function isEventBeforeToday(dateIso: string): boolean {
  const day = dateIso.slice(0, 10);
  if (day.length !== 10) return false;
  return day < todayIsoDate();
}

function sortEventsByDateAsc(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    const da = a.date.slice(0, 10);
    const db = b.date.slice(0, 10);
    if (da !== db) return da.localeCompare(db);
    return a.slug.localeCompare(b.slug);
  });
}

function sortEventsByDateDesc(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    const da = a.date.slice(0, 10);
    const db = b.date.slice(0, 10);
    if (da !== db) return db.localeCompare(da);
    return a.slug.localeCompare(b.slug);
  });
}

/** Kalenderexport / .ics-Link: gleiche Regel wie «aktive» Liste — nur nicht abgesagt und Datum ≥ heute. */
export function isMarketingEventEligibleForIcs(
  event: Pick<Event, "date" | "status">,
): boolean {
  if (event.status === "cancelled") return false;
  return isEventOnOrAfterToday(event.date);
}

/** Kalendertag vor heute — für Homepage-Vergangenheits-Badges (Abgesagte ausblenden). */
export function isMarketingEventPast(
  event: Pick<Event, "date" | "status">,
): boolean {
  if (event.status === "cancelled") return false;
  return isEventBeforeToday(event.date);
}

function filterUpcomingSorted(events: Event[]): Event[] {
  return sortEventsByDateAsc(
    events.filter((e) => {
      if (e.status === "cancelled") return false;
      return isEventOnOrAfterToday(e.date);
    }),
  );
}

/** Past events — newest date first — cancelled rows omitted (consistent with listing). */
function filterPastSortedDesc(events: Event[]): Event[] {
  return sortEventsByDateDesc(
    events.filter((e) => {
      if (e.status === "cancelled") return false;
      return isEventBeforeToday(e.date);
    }),
  );
}

async function fetchEventsListFromPayload(): Promise<Event[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "events",
    sort: "date",
    /** List cards need populated media + hero group; avoid deeper relation graphs. */
    depth: 1,
    /** Upper bound for list + homepage “next event” pick; increase if you publish more rows per season. */
    limit: 200,
  });
  return validators.eventList(res.docs as PayloadEventDoc[]);
}

const fetchEventsFromCms = unstable_cache(
  async (): Promise<Event[]> => fetchEventsListFromPayload(),
  ["cms-events-list"],
  {
    tags: [REVALIDATE_TAGS.events],
    revalidate: CMS_ISR_SECONDS,
  },
);

async function fetchSingleEventFromPayload(
  slug: string,
): Promise<Event | null> {
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
}

function fetchEventBySlugCached(slug: string) {
  return unstable_cache(
    async (): Promise<Event | null> => fetchSingleEventFromPayload(slug),
    ["cms-event", slug],
    {
      tags: [REVALIDATE_TAGS.events],
      revalidate: CMS_ISR_SECONDS,
    },
  );
}

async function loadAllMarketingEvents(): Promise<Event[]> {
  if (await isCmsPreviewRequest()) {
    return fetchEventsListFromPayload();
  }
  return fetchEventsFromCms();
}

async function loadUpcomingEvents(): Promise<Event[]> {
  const all = await loadAllMarketingEvents();
  return filterUpcomingSorted(all);
}

async function loadEventListingPartitions(): Promise<{
  active: Event[];
  past: Event[];
}> {
  const all = await loadAllMarketingEvents();
  return {
    active: filterUpcomingSorted(all),
    past: filterPastSortedDesc(all),
  };
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

  /**
   * Events page: aktive/anstehende (Kalendertag heute oder später) vs. Vergangenes (Kalendertag vor heute).
   * Abgesagte Einträge erscheinen in keiner Liste.
   */
  async getEventListingPartitions(): Promise<{
    active: Event[];
    past: Event[];
  }> {
    try {
      return await loadEventListingPartitions();
    } catch (err) {
      logger.warn(
        "Payload events unavailable for listing partitions.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return { active: [], past: [] };
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
    if (await isCmsPreviewRequest()) {
      return fetchSingleEventFromPayload(slug);
    }
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
      /** Slugs only; cap above list `limit` so prerender paths stay in sync with CMS. */
      limit: 500,
    });
    return res.docs
      .map((d) => (typeof d.slug === "string" ? d.slug : null))
      .filter((s): s is string => Boolean(s && s.length > 0));
  },
};
