"use client";

import {
  getEventScheduleEndMs,
  getEventScheduleStartMs,
} from "@/lib/calendar/event-schedule-bounds";
import { useEffect, useMemo, useState } from "react";

type Digits = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const Z: Digits = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

export type HeroEventClock =
  | ({ phase: "upcoming"; isPast: false } & Digits)
  | { phase: "live"; isPast: false }
  | { phase: "past"; isPast: true };

const upcoming = (
  d: Digits,
): Extract<HeroEventClock, { phase: "upcoming" }> => ({
  phase: "upcoming",
  isPast: false,
  ...d,
});

const LIVE: HeroEventClock = { phase: "live", isPast: false };
const PAST: HeroEventClock = { phase: "past", isPast: true };

function digits(diff: number): Digits {
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function clockAt(
  now: number,
  startMs: number,
  endMs: number,
  fallbackTarget: number,
): HeroEventClock {
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
    if (Number.isNaN(fallbackTarget)) return upcoming(Z);
    const diff = fallbackTarget - now;
    if (diff <= 0) return LIVE;
    return upcoming(digits(diff));
  }
  if (now < startMs) return upcoming(digits(startMs - now));
  if (now < endMs) return LIVE;
  return PAST;
}

/** Countdown + LIVE — gleiche Zeitfenster wie ICS (ganztägig / Start + 2 h). */
export function useHeroEventClock(eventIso: string): HeroEventClock {
  const startMs = useMemo(() => getEventScheduleStartMs(eventIso), [eventIso]);
  const endMs = useMemo(() => getEventScheduleEndMs(eventIso), [eventIso]);
  const fallbackTarget = useMemo(
    () => new Date(eventIso).getTime(),
    [eventIso],
  );

  const [clock, setClock] = useState<HeroEventClock>(() =>
    clockAt(Date.now(), startMs, endMs, fallbackTarget),
  );

  useEffect(() => {
    const tick = () =>
      setClock(clockAt(Date.now(), startMs, endMs, fallbackTarget));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [startMs, endMs, fallbackTarget]);

  return clock;
}
