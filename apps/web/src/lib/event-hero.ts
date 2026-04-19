import type {
  Event,
  HeroCta,
  HomepageHeroBlockView,
} from "@driversclub/shared";

import { formatEventDateLabelDe } from "@/lib/format-event-date";

function isGalleryCta(href: string): boolean {
  const path = href.trim().split("?")[0]?.split("#")[0] ?? "";
  return path === "/gallery" || path.startsWith("/gallery/");
}

const DEFAULT_COUNTDOWN_FALLBACK = "2026-04-19T12:00:00";

/** When no event drives the hero (matches `defaultHomepageLayoutView` hero block). */
const HERO_FALLBACK_COPY = {
  eyebrow: "Mi Familia & Friends praesentiert",
  titleLine1: "Tuning",
  titleLine2: "Treffen",
  dateLabel: "19 · 04 · 2026",
  badge: "EST. 2024 • HESSEN",
  tagline: "DriversClub Hessen × Mi Familia & Friends",
} as const;

export function splitEventTitle(title: string): {
  line1: string;
  line2: string;
} {
  const t = title.trim();
  if (!t) return { line1: "", line2: "" };
  const i = t.indexOf(" ");
  if (i === -1) return { line1: t, line2: "" };
  return { line1: t.slice(0, i), line2: t.slice(i + 1).trim() };
}

function ctasForFeaturedEvent(featured: Event): readonly HeroCta[] | undefined {
  if (!featured.heroCtas?.length) return undefined;
  const filtered = featured.heroCtas.filter((c) => !isGalleryCta(c.href));
  return filtered.length > 0 ? filtered : undefined;
}

function staticHeroFallback(): MergedHeroProps {
  return {
    eyebrow: HERO_FALLBACK_COPY.eyebrow,
    titleLine1: HERO_FALLBACK_COPY.titleLine1,
    titleLine2: HERO_FALLBACK_COPY.titleLine2,
    dateLabel: HERO_FALLBACK_COPY.dateLabel,
    countdownEndIso: DEFAULT_COUNTDOWN_FALLBACK,
    badgeText: HERO_FALLBACK_COPY.badge,
    tagline: HERO_FALLBACK_COPY.tagline,
    ctas: undefined,
    backgroundImageUrl: undefined,
  };
}

export type MergedHeroProps = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  dateLabel: string;
  countdownEndIso: string;
  badgeText?: string;
  tagline?: string;
  ctas?: readonly HeroCta[];
  backgroundImageUrl?: string;
};

/**
 * Hero content priority:
 * 1. **`block.heroSourceEvent`** — Homepage hero block → `heroEvent` (Payload)
 * 2. **`nextUpcoming`** — first upcoming event when no relationship
 * 3. **Site defaults** — when no event is available
 *
 * Datum- und Countdown-Anzeige kommen immer aus `event.date`; optionale Overrides nur für Texte/Bilder in `homepageHero`.
 */
export function mergeHomepageHero(
  block: HomepageHeroBlockView,
  nextUpcoming: Event | null,
): MergedHeroProps {
  const source = block.heroSourceEvent ?? nextUpcoming;
  if (!source) {
    return staticHeroFallback();
  }

  const parts = splitEventTitle(source.title);
  const titleLine1 =
    source.heroTitleLine1?.trim() ||
    parts.line1 ||
    source.title ||
    HERO_FALLBACK_COPY.titleLine1;
  const titleLine2 =
    source.heroTitleLine2?.trim() ||
    parts.line2 ||
    source.location ||
    HERO_FALLBACK_COPY.titleLine2;

  const dateIso = source.date?.trim();
  const dateLabel = dateIso
    ? formatEventDateLabelDe(dateIso)
    : HERO_FALLBACK_COPY.dateLabel;
  const countdownEndIso = dateIso || DEFAULT_COUNTDOWN_FALLBACK;

  const backgroundImageUrl =
    source.heroBackgroundImage?.url ?? source.images?.[0]?.url;

  return {
    eyebrow: source.heroEyebrow?.trim() || HERO_FALLBACK_COPY.eyebrow,
    titleLine1,
    titleLine2,
    dateLabel,
    countdownEndIso,
    badgeText: source.heroBadge?.trim() || HERO_FALLBACK_COPY.badge,
    tagline: source.heroTagline?.trim() || HERO_FALLBACK_COPY.tagline,
    ctas: ctasForFeaturedEvent(source),
    backgroundImageUrl,
  };
}
