import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import type { HeroCta } from "@driversclub/shared";
import {
  estTag,
  hero,
  heroBackdropImage,
  heroBackdropPhoto,
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

import { HeroCountdown } from "./HeroCountdown";

const DEFAULT_COUNTDOWN_END = "2026-04-19T12:00:00";

const DEFAULT_BADGE = "EST. 2024 • HESSEN";
const DEFAULT_TAGLINE = "DriversClub Hessen × Mi Familia & Friends";

const DEFAULT_CTAS: readonly HeroCta[] = [
  { href: "/#location", label: "Zum Event", variant: "primary" },
  { href: "/events", label: "Alle Events", variant: "outline" },
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

export type HeroSectionProps = {
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
  /** When true, optimizes LCP for above-the-fold heroes (homepage / event detail). */
  priorityBackground?: boolean;
};

export function HeroSection({
  eyebrow = "Mi Familia & Friends präsentiert",
  titleLine1 = "Tuning",
  titleLine2 = "Treffen",
  dateLabel = "19 · 04 · 2026",
  countdownEndIso = DEFAULT_COUNTDOWN_END,
  badgeText = DEFAULT_BADGE,
  tagline = DEFAULT_TAGLINE,
  ctas,
  backgroundImageUrl,
  priorityBackground = false,
}: HeroSectionProps) {
  const resolvedCtas = ctas && ctas.length > 0 ? ctas : [...DEFAULT_CTAS];

  return (
    <section className={hero}>
      {backgroundImageUrl ? (
        <div className={heroBackdropPhoto} aria-hidden>
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            sizes="100vw"
            className={heroBackdropImage}
            priority={priorityBackground}
            fetchPriority={priorityBackground ? "high" : "low"}
          />
        </div>
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

        <HeroCountdown countdownEndIso={countdownEndIso} />

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
}
