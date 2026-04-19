import { calendarLocationLine } from "@/lib/calendar/event-calendar-export";
import { isPayloadDateOnlyEventInstant } from "@/lib/format-event-date";
import type { Event } from "@driversclub/shared";

const EVENT_SCHEDULED = "https://schema.org/EventScheduled";
const EVENT_CANCELLED = "https://schema.org/EventCancelled";
const OFFLINE = "https://schema.org/OfflineEventAttendanceMode";

function addOneDayYmd(dayYmd: string): string {
  const [y, m, d] = dayYmd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + 1);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

/**
 * schema.org `Event` JSON-LD for rich results (wenn Suchmaschinen die Site crawlen dürfen).
 */
export function buildEventJsonLd(
  event: Event,
  canonicalUrl: string,
): Record<string, unknown> {
  const iso = event.date.trim();
  let startDate: string;
  let endDate: string | undefined;

  if (isPayloadDateOnlyEventInstant(iso)) {
    const day = iso.slice(0, 10);
    startDate = day;
    endDate = addOneDayYmd(day);
  } else {
    const start = new Date(iso);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    startDate = start.toISOString();
    endDate = end.toISOString();
  }

  const locName = calendarLocationLine(event);
  const location: Record<string, unknown> = {
    "@type": "Place",
    name: locName,
  };
  if (event.address?.trim()) {
    location.address = {
      "@type": "PostalAddress",
      streetAddress: event.address.trim(),
    };
  }

  const eventStatus =
    event.status === "cancelled" ? EVENT_CANCELLED : EVENT_SCHEDULED;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: `${event.title} — ${locName}`,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventAttendanceMode: OFFLINE,
    eventStatus,
    location,
    url: canonicalUrl,
  };
}
