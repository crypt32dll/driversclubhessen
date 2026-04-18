import type { Event, HeroCta } from "@driversclub/shared";
import type { HomepageHeroBlockView } from "@driversclub/shared";

const DEFAULT_COUNTDOWN_FALLBACK = "2026-04-19T12:00:00";

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

/** Display line like `19 · 04 · 2026` from an ISO date or datetime string. */
export function formatEventDateLabelDe(dateIso: string): string {
  const day = dateIso.slice(0, 10);
  if (day.length !== 10) return dateIso;
  const [y, m, d] = day.split("-").map(Number);
  if (!y || !m || !d) return dateIso;
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${dd} · ${mm} · ${y}`;
}

function countdownIsoFromEventDate(dateIso: string): string {
  const day = dateIso.slice(0, 10);
  if (day.length !== 10) return dateIso;
  return `${day}T12:00:00`;
}

function ctasForNextEvent(
  next: Event,
  block: HomepageHeroBlockView,
): readonly HeroCta[] {
  if (next.heroCtas && next.heroCtas.length > 0) {
    return next.heroCtas;
  }
  const eventHref = `/events/${next.slug}`;
  const fromBlock = block.ctas ?? [];
  const filtered = fromBlock.filter((c) => c.href !== eventHref);
  return [
    {
      label: "Zum Event",
      href: eventHref,
      variant: "primary" as const,
      openInNewTab: false,
    },
    ...filtered,
  ];
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
 * When `next` is the next upcoming event, hero content is driven by the event (Payload `homepageHero` + fallbacks).
 * Otherwise the homepage hero block from CMS is used unchanged.
 */
export function mergeHomepageHeroWithNextEvent(
  block: HomepageHeroBlockView,
  next: Event | null,
): MergedHeroProps {
  if (!next) {
    return {
      eyebrow: block.eyebrow,
      titleLine1: block.titleLine1,
      titleLine2: block.titleLine2,
      dateLabel: block.dateLabel,
      countdownEndIso: block.countdownEnd ?? DEFAULT_COUNTDOWN_FALLBACK,
      badgeText: block.badge,
      tagline: block.tagline,
      ctas: block.ctas,
      backgroundImageUrl: block.backgroundImage?.url,
    };
  }

  const parts = splitEventTitle(next.title);
  const titleLine1 =
    next.heroTitleLine1?.trim() ||
    parts.line1 ||
    next.title ||
    block.titleLine1;
  const titleLine2 =
    next.heroTitleLine2?.trim() ||
    parts.line2 ||
    next.location ||
    block.titleLine2;

  const dateLabel =
    next.heroDateLabel?.trim() ||
    formatEventDateLabelDe(next.date) ||
    block.dateLabel;

  const countdownEndIso =
    next.heroCountdownEnd?.trim() ||
    countdownIsoFromEventDate(next.date) ||
    block.countdownEnd ||
    DEFAULT_COUNTDOWN_FALLBACK;

  const backgroundImageUrl =
    next.heroBackgroundImage?.url ??
    next.images?.[0]?.url ??
    block.backgroundImage?.url;

  return {
    eyebrow: next.heroEyebrow?.trim() || block.eyebrow,
    titleLine1,
    titleLine2,
    dateLabel,
    countdownEndIso,
    badgeText: next.heroBadge?.trim() || block.badge,
    tagline: next.heroTagline?.trim() || block.tagline,
    ctas: ctasForNextEvent(next, block),
    backgroundImageUrl,
  };
}
