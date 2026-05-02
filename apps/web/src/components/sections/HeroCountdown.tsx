"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { useHeroEventClock } from "@/hooks/useCountdown";
import type { HeroCta } from "@driversclub/shared";
import type { ReactNode } from "react";
import {
  cdBlock,
  cdLabel,
  cdNum,
  countdown,
  heroCtas,
  heroCtasAfterDateGap,
} from "./sections.css";

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

type Props = {
  countdownEndIso: string;
  ctas: readonly HeroCta[];
  /**
   * Vom Server: gleiche Grenze wie Event-Liste / .ics (`isMarketingEventEligibleForIcs`).
   * Countdown/JETZT LIVE nutzen weiter das ICS-Zeitfenster — ohne diese Flagge würden
   * Buttons am selben Kalendertag nach Event-Ende verschwinden.
   */
  showHeroActions?: boolean;
};

/** Countdown / LIVE (ICS-Zeitfenster) + Hero-Buttons (Kalendertag / Status, serverseitig). */
export function HeroCountdown({
  countdownEndIso,
  ctas,
  showHeroActions = true,
}: Props) {
  const clock = useHeroEventClock(countdownEndIso);
  const showCountdownShell = clock.phase !== "past";

  let countdownEl: ReactNode = null;
  if (showCountdownShell) {
    if (clock.phase === "live") {
      countdownEl = (
        <div className={countdown}>
          <div className={cdBlock}>
            <span className={cdNum}>JETZT LIVE</span>
          </div>
        </div>
      );
    } else if (clock.phase === "upcoming") {
      countdownEl = (
        <div className={countdown}>
          {[
            { value: clock.days, label: "Tage" },
            { value: clock.hours, label: "Stunden" },
            { value: clock.minutes, label: "Minuten" },
            { value: clock.seconds, label: "Sekunden" },
          ].map((entry) => (
            <div key={entry.label} className={cdBlock}>
              <span className={cdNum}>{entry.value}</span>
              <span className={cdLabel}>{entry.label}</span>
            </div>
          ))}
        </div>
      );
    }
  }

  if (!showCountdownShell && !showHeroActions) {
    return null;
  }

  const onlyActions = showHeroActions && !showCountdownShell;

  return (
    <>
      {countdownEl}
      {showHeroActions ? (
        <div
          className={
            onlyActions ? `${heroCtas} ${heroCtasAfterDateGap}` : heroCtas
          }
        >
          {ctas.map((c) => {
            const variant = c.variant === "outline" ? "outline" : "primary";
            const newTab = c.openInNewTab ?? isExternalHref(c.href);
            return (
              <ButtonLink
                key={`${c.href}-${c.label}`}
                href={c.href}
                variant={variant}
                {...(newTab
                  ? { target: "_blank" as const, rel: "noopener noreferrer" }
                  : {})}
              >
                {c.label}
              </ButtonLink>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
