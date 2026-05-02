import {
  EVENT_TIMED_DEFAULT_DURATION_MS,
  addDaysYmd,
} from "@/lib/calendar/event-schedule-bounds";
import { isPayloadDateOnlyEventInstant } from "@/lib/format-event-date";
import { getMarketingSiteOrigin } from "@/lib/site-origin";
import type { Event } from "@driversclub/shared";

import {
  buildCalendarDescription,
  calendarLocationLine,
} from "./event-calendar-export.ts";
import { escapeIcsText, foldIcsContentLine } from "./ics-text.ts";

const PRODID = "-//DriversClub Hessen//DE";
const CALNAME = "DriversClub Hessen — Events";

function eventUid(slug: string, host: string): string {
  const safeHost = host.replace(/^https?:\/\//i, "").split("/")[0];
  return `event-${slug}@${safeHost}`;
}

function dtStampUtc(): string {
  return `${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

function buildVevent(event: Event, siteOrigin: string): string {
  const url = `${siteOrigin}/events/${event.slug}`;
  const summary = escapeIcsText(event.title);
  const location = escapeIcsText(calendarLocationLine(event));
  const description = escapeIcsText(
    buildCalendarDescription(event, siteOrigin),
  );

  const lines: string[] = [];
  lines.push("BEGIN:VEVENT");
  lines.push(foldIcsContentLine(`UID:${eventUid(event.slug, siteOrigin)}`));
  lines.push(`DTSTAMP:${dtStampUtc()}`);
  lines.push(foldIcsContentLine(`URL:${url}`));

  const iso = event.date.trim();
  if (isPayloadDateOnlyEventInstant(iso)) {
    const day = iso.slice(0, 10);
    const endExclusive = addDaysYmd(day);
    lines.push(`DTSTART;VALUE=DATE:${day.replace(/-/g, "")}`);
    lines.push(`DTEND;VALUE=DATE:${endExclusive.replace(/-/g, "")}`);
  } else {
    const start = new Date(iso);
    const end = new Date(start.getTime() + EVENT_TIMED_DEFAULT_DURATION_MS);
    const fmt = (d: Date) =>
      `${d.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
    lines.push(`DTSTART:${fmt(start)}`);
    lines.push(`DTEND:${fmt(end)}`);
  }

  lines.push(foldIcsContentLine(`SUMMARY:${summary}`));
  lines.push(foldIcsContentLine(`LOCATION:${location}`));
  lines.push(foldIcsContentLine(`DESCRIPTION:${description}`));
  lines.push("END:VEVENT");
  return lines.join("\r\n");
}

/**
 * Builds an iCalendar document for the given events (typically upcoming, non-cancelled).
 */
export function buildEventsIcsDocument(events: Event[]): string {
  const siteOrigin = getMarketingSiteOrigin();
  const blocks = events.map((e) => buildVevent(e, siteOrigin));
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${PRODID}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    foldIcsContentLine(`X-WR-CALNAME:${escapeIcsText(CALNAME)}`),
    ...blocks,
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}
