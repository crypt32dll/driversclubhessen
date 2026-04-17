"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { useCountdown } from "@/hooks/useCountdown";
import {
  badge,
  cdBlock,
  cdLabel,
  cdNum,
  countdown,
  estTag,
  hero,
  heroBg,
  heroContent,
  heroCtas,
  heroEyebrow,
  heroGrid,
  heroSub,
  heroTitle,
  heroTitleLine1,
  heroTitleLine2,
} from "./sections.css";

const DEFAULT_COUNTDOWN_END = "2026-04-19T12:00:00";

type Props = {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  dateLabel?: string;
  /** ISO datetime string for the countdown target */
  countdownEndIso?: string;
};

export const HeroSection = ({
  eyebrow = "Mi Familia & Friends präsentiert",
  titleLine1 = "Tuning",
  titleLine2 = "Treffen",
  dateLabel = "19 · 04 · 2026",
  countdownEndIso = DEFAULT_COUNTDOWN_END,
}: Props) => {
  const { days, hours, minutes, seconds, isLive } =
    useCountdown(countdownEndIso);

  return (
    <section className={hero}>
      <div className={heroBg} aria-hidden />
      <div className={heroGrid} aria-hidden />
      <div className={heroContent}>
        <div className={badge}>EST. 2024 • HESSEN</div>
        <p className={heroEyebrow}>{eyebrow}</p>
        <h1 className={heroTitle}>
          <span className={heroTitleLine1}>{titleLine1}</span>
          <span className={heroTitleLine2}>{titleLine2}</span>
        </h1>
        <p className={heroSub}>{dateLabel}</p>

        {isLive ? (
          <div className={countdown}>
            <div className={cdBlock}>
              <span className={cdNum}>JETZT LIVE</span>
            </div>
          </div>
        ) : (
          <div className={countdown}>
            {[
              { value: days, label: "Tage" },
              { value: hours, label: "Stunden" },
              { value: minutes, label: "Minuten" },
              { value: seconds, label: "Sekunden" },
            ].map((entry) => (
              <div key={entry.label} className={cdBlock}>
                <span className={cdNum}>
                  {String(entry.value).padStart(2, "0")}
                </span>
                <span className={cdLabel}>{entry.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={heroCtas}>
          <ButtonLink href="/#location">Zum Event</ButtonLink>
          <ButtonLink href="/events" variant="outline">
            Alle Events
          </ButtonLink>
          <ButtonLink href="/gallery" variant="outline">
            Galerie
          </ButtonLink>
          <ButtonLink
            href="https://www.instagram.com/driversclubhessen"
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @driversclubhessen
          </ButtonLink>
        </div>
        <p className={estTag}>DriversClub Hessen × Mi Familia & Friends</p>
      </div>
    </section>
  );
};
