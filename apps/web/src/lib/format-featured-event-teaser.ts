import type { Event } from "@driversclub/shared";

import { formatEventDateTimeDe } from "@/lib/format-event-date";

/** One-line teaser: when · title · location (same idea as former CMS `featuredEventText`). */
export function formatFeaturedEventTeaser(ev: Event): string | undefined {
  if (!ev.date?.trim()) {
    return [ev.title, ev.location].filter(Boolean).join(" · ");
  }
  const when = formatEventDateTimeDe(ev.date);
  return [when, ev.title, ev.location].filter(Boolean).join(" · ");
}
