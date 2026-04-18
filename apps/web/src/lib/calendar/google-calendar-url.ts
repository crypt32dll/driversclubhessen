import {
  buildCalendarDescription,
  calendarLocationLine,
} from "@/lib/calendar/event-calendar-export.ts";
import { isPayloadDateOnlyEventInstant } from "@/lib/format-event-date";
import type { Event } from "@driversclub/shared";

function ymdToGcalRange(iso: string): { dates: string } {
  const s = iso.trim();
  if (isPayloadDateOnlyEventInstant(s)) {
    const day = s.slice(0, 10).replace(/-/g, "");
    const end = addOneDayYmd(day);
    return { dates: `${day}/${end}` };
  }
  const start = new Date(s);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    `${d.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
  return { dates: `${fmt(start)}/${fmt(end)}` };
}

function addOneDayYmd(ymd: string): string {
  const y = Number(ymd.slice(0, 4));
  const m = Number(ymd.slice(4, 6)) - 1;
  const d = Number(ymd.slice(6, 8));
  const dt = new Date(Date.UTC(y, m, d));
  dt.setUTCDate(dt.getUTCDate() + 1);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

/**
 * Google “Add to Calendar” template URL for one event.
 */
export function buildGoogleCalendarTemplateUrl(
  event: Event,
  siteOrigin: string,
): string {
  const { dates } = ymdToGcalRange(event.date);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates,
    details: buildCalendarDescription(event, siteOrigin),
    location: calendarLocationLine(event),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
