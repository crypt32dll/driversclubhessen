"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { useCountdown } from "@/hooks/useCountdown";
import type { HeroCta } from "@driversclub/shared";
import {
  cdBlock,
  cdLabel,
  cdNum,
  countdown,
  estTag,
  hero,
  badge as heroBadgePill,
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

const DEFAULT_BADGE = "EST. 2024 • HESSEN";
const DEFAULT_TAGLINE = "DriversClub Hessen × Mi Familia & Friends";

const DEFAULT_CTAS: readonly HeroCta[] = [
  { href: "/#location", label: "Zum Event", variant: "primary" },
  { href: "/events", label: "Alle Events", variant: "outline" },
  { href: "/gallery", label: "Galerie", variant: "outline" },
  {
    href: "https://www.instagram.com/driversclubhessen",
    label: "@driversclubhessen",
    variant: "outline",
    openInNewTab: true,
  },
];

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

type Props = {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  dateLabel?: string;
  /** ISO datetime string for the countdown target */
  countdownEndIso?: string;
  badgeText?: string;
  tagline?: string;
  ctas?: readonly HeroCta[];
  /** Optional full-bleed background (CMS media URL). */
  backgroundImageUrl?: string;
};

export const HeroSection = ({
  eyebrow = "Mi Familia & Friends präsentiert",
  titleLine1 = "Tuning",
  titleLine2 = "Treffen",
  dateLabel = "19 · 04 · 2026",
  countdownEndIso = DEFAULT_COUNTDOWN_END,
  badgeText = DEFAULT_BADGE,
  tagline = DEFAULT_TAGLINE,
  ctas,
  backgroundImageUrl,
}: Props) => {
  const { days, hours, minutes, seconds, isLive } =
    useCountdown(countdownEndIso);

  const resolvedCtas = ctas && ctas.length > 0 ? ctas : [...DEFAULT_CTAS];

  return (
    <section className={hero}>
      {backgroundImageUrl ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      ) : null}
      <div className={heroBg} aria-hidden />
      <div className={heroGrid} aria-hidden />
      <div className={heroContent}>
        <div className={heroBadgePill}>{badgeText}</div>
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
          {resolvedCtas.map((c) => {
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
        <p className={estTag}>{tagline}</p>
      </div>
    </section>
  );
};
