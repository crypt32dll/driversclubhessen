import type { Event, EventInfoCard } from "@driversclub/shared";

import {
  formatEventDateTimeDe,
  isPayloadDateOnlyEventInstant,
} from "@/lib/format-event-date";

const DEFAULT_ADMISSION_VALUE = "Kostenlos";
const DEFAULT_ADMISSION_SUB = "Eintritt frei – jeder ist willkommen!";

function weekdayLabel(iso: string): string {
  const s = iso.trim();
  const instant = isPayloadDateOnlyEventInstant(s)
    ? new Date(`${s.slice(0, 10)}T12:00:00Z`)
    : new Date(s);
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    timeZone: isPayloadDateOnlyEventInstant(s) ? "UTC" : "Europe/Berlin",
  }).format(instant);
}

function timeLabel(iso: string): { value: string; sub: string } {
  if (isPayloadDateOnlyEventInstant(iso)) {
    return {
      value: "Ganztägig",
      sub: "Keine feste Startuhrzeit im Kalender",
    };
  }
  const t = new Intl.DateTimeFormat("de-DE", {
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
  return {
    value: t,
    sub: "Beginn (lokal)",
  };
}

/** Four info cards derived from a single event (homepage “Das Event” section). */
export function buildEventInfoCardsFromEvent(event: Event): EventInfoCard[] {
  const dateIso = event.date;
  const dateValue = formatEventDateTimeDe(dateIso);
  const dateSub = weekdayLabel(dateIso);
  const { value: timeValue, sub: timeSub } = timeLabel(dateIso);

  const locSub = event.address?.trim() || "\u2014";

  const admRaw = event.admissionNote?.trim();
  let admissionValue: string;
  let admissionSub: string;
  if (admRaw) {
    const lines = admRaw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    admissionValue = lines[0] ?? DEFAULT_ADMISSION_VALUE;
    admissionSub = lines.slice(1).join(" ") || "\u2014";
  } else {
    admissionValue = DEFAULT_ADMISSION_VALUE;
    admissionSub = DEFAULT_ADMISSION_SUB;
  }

  return [
    {
      icon: "📅",
      title: "Datum",
      value: dateValue,
      sub: dateSub,
    },
    {
      icon: "🕐",
      title: "Uhrzeit",
      value: timeValue,
      sub: timeSub,
    },
    {
      icon: "📍",
      title: "Location",
      value: event.location,
      sub: locSub,
    },
    {
      icon: "🎟️",
      title: "Eintritt",
      value: admissionValue,
      sub: admissionSub,
    },
  ];
}
