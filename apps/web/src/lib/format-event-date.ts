/**
 * Payload `type: "date"` is usually persisted as midnight or noon UTC on the
 * chosen calendar day. Feeding that straight into `new Date()` + local
 * `timeStyle: "short"` shows a misleading wall time (e.g. 14:00 in DE).
 * When we detect that pattern, we format only the civil date in UTC.
 */

export function isPayloadDateOnlyEventInstant(iso: string): boolean {
  const s = iso.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return true;
  return /^(\d{4}-\d{2}-\d{2})T(00|12):00:00(\.\d+)?(Z|[+-]00:?00)$/.test(s);
}

/** List cards, homepage teasers: medium date; clock only for real datetimes. */
export function formatEventDateTimeDe(iso: string): string {
  const s = iso.trim();
  if (isPayloadDateOnlyEventInstant(s)) {
    const day = s.slice(0, 10);
    return new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(`${day}T12:00:00Z`));
  }
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(s));
}

/** Hero date line / meta: long date; clock only for real datetimes. */
export function formatEventDateLabelDe(iso: string): string {
  const s = iso.trim();
  if (isPayloadDateOnlyEventInstant(s)) {
    const day = s.slice(0, 10);
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${day}T12:00:00Z`));
  }
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(s));
}
