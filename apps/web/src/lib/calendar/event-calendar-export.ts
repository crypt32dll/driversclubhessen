import { formatEventDateTimeDe } from "@/lib/format-event-date";
import type { Event } from "@driversclub/shared";

/**
 * Single line for ICS `LOCATION` and Google Calendar `location` — Treffpunkt + ggf. Adresse.
 */
export function calendarLocationLine(event: Event): string {
  const treff = event.location.trim();
  const addr = event.address?.trim();
  if (addr) return `${treff} · ${addr}`;
  return treff;
}

/**
 * Mehrzeilige Beschreibung: Datum/Zeit, Ort, Adresse, Link zur Event-Seite.
 */
export function buildCalendarDescription(
  event: Event,
  siteOrigin: string,
): string {
  const url = `${siteOrigin}/events/${event.slug}`;
  const lines: string[] = [
    `Wann: ${formatEventDateTimeDe(event.date)}`,
    `Treffpunkt: ${event.location.trim()}`,
  ];
  if (event.address?.trim()) {
    lines.push(`Adresse: ${event.address.trim()}`);
  }
  lines.push(`Details: ${url}`);
  return lines.join("\n");
}
