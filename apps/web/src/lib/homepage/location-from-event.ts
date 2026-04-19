import type { Event } from "@driversclub/shared";

import {
  formatEventDateTimeDe,
  isPayloadDateOnlyEventInstant,
} from "@/lib/format-event-date";

const FALLBACK_MAP =
  "https://maps.google.com/?q=Industriestraße+6+63633+Birstein";

const DEFAULT_ADMISSION_VALUE = "Kostenlos";
const DEFAULT_ADMISSION_SUB = "Eintritt frei – jeder ist willkommen!";

function weekdayLong(iso: string): string {
  const s = iso.trim();
  const instant = isPayloadDateOnlyEventInstant(s)
    ? new Date(`${s.slice(0, 10)}T12:00:00Z`)
    : new Date(s);
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    timeZone: isPayloadDateOnlyEventInstant(s) ? "UTC" : "Europe/Berlin",
  }).format(instant);
}

function admissionLines(event: Event): { value: string; sub: string } {
  const admRaw = event.admissionNote?.trim();
  if (admRaw) {
    const lines = admRaw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    return {
      value: lines[0] ?? DEFAULT_ADMISSION_VALUE,
      sub: lines.slice(1).join(" ") || "—",
    };
  }
  return { value: DEFAULT_ADMISSION_VALUE, sub: DEFAULT_ADMISSION_SUB };
}

export function buildGoogleMapsUrlFromEvent(event: Event): string {
  const custom = event.mapsUrl?.trim();
  if (custom && /^https?:\/\//i.test(custom)) {
    return custom;
  }
  const q = event.address?.trim() || event.location?.trim();
  if (!q) {
    return FALLBACK_MAP;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Zeilen für «Anfahrt» aus Event-Daten (Lead-Event auf der Startseite). */
export function buildLocationRowsFromEvent(event: Event): Array<{
  icon: string;
  label: string;
  value: string;
}> {
  const addr = event.address?.trim();
  const addressValue = addr || event.location;

  const dateIso = event.date;
  const terminValue = `${formatEventDateTimeDe(dateIso)}\n${weekdayLong(dateIso)}`;

  const { value: admValue, sub: admSub } = admissionLines(event);
  const eintrittValue = admSub === "—" ? admValue : `${admValue}\n${admSub}`;

  return [
    {
      icon: "📍",
      label: "Adresse",
      value: addressValue,
    },
    {
      icon: "🕐",
      label: "Termin",
      value: terminValue,
    },
    {
      icon: "🎟️",
      label: "Eintritt",
      value: eintrittValue,
    },
  ];
}

/** Kurztexte auf der Map-Kachel (max. 2 Zeilen). */
export function mapPreviewPrimarySecondary(event: Event): {
  primary: string;
  secondary: string;
} {
  const addr = event.address?.trim();
  if (addr) {
    const lines = addr
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length >= 2) {
      return {
        primary: lines[0] ?? event.location,
        secondary: lines.slice(1).join(", "),
      };
    }
    if (lines.length === 1) {
      const one = lines[0] ?? event.location;
      return {
        primary: one,
        secondary: event.location !== one ? event.location : "",
      };
    }
  }
  return { primary: event.location, secondary: "" };
}
