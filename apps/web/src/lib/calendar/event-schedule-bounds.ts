import { isPayloadDateOnlyEventInstant } from "@/lib/format-event-date";

/** Same duration as ICS `DTEND` for timed events (`build-events-ics`). */
export const EVENT_TIMED_DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000;

export function addDaysYmd(dateYmd: string): string {
  const [y, m, d] = dateYmd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + 1);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function utcMidnightExclusiveEndMs(endExclusiveYmd: string): number {
  const [y, m, d] = endExclusiveYmd.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/**
 * Interpreted start instant for countdown / UX — aligned with hero `Date` parsing
 * (`formatEventDate*`, Payload date-only noon UTC anchor).
 */
export function getEventScheduleStartMs(iso: string): number {
  const s = iso.trim();
  if (!s || Number.isNaN(new Date(s).getTime())) {
    return Number.NaN;
  }
  if (isPayloadDateOnlyEventInstant(s)) {
    const day = s.slice(0, 10);
    return new Date(`${day}T12:00:00.000Z`).getTime();
  }
  return new Date(s).getTime();
}

/** Event end (`DTEND`): date-only ⇒ exclusive calendar day UTC; timed ⇒ start + default duration — matches ICS export. */
export function getEventScheduleEndMs(iso: string): number {
  const s = iso.trim();
  const startMs = getEventScheduleStartMs(s);
  if (Number.isNaN(startMs)) {
    return Number.NaN;
  }
  if (isPayloadDateOnlyEventInstant(s)) {
    const day = s.slice(0, 10);
    const endExclusive = addDaysYmd(day);
    return utcMidnightExclusiveEndMs(endExclusive);
  }
  return startMs + EVENT_TIMED_DEFAULT_DURATION_MS;
}
