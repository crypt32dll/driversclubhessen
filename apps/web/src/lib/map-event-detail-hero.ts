import type { Event, HeroCta } from "@driversclub/shared";

const DEFAULT_CTAS: readonly HeroCta[] = [
  { href: "/events", label: "Alle Events", variant: "outline" },
];

function formatWhen(dateIso: string) {
  return new Date(dateIso).toLocaleString("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

function splitTitle(title: string): { line1: string; line2: string } {
  const t = title.trim();
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { line1: t || "Event", line2: "DriversClub Hessen" };
  }
  const mid = Math.ceil(parts.length / 2);
  return {
    line1: parts.slice(0, mid).join(" "),
    line2: parts.slice(mid).join(" "),
  };
}

/** Maps CMS + core event fields into homepage-style hero props. */
export function mapEventToHeroProps(event: Event) {
  const split = splitTitle(event.title);
  const titleLine1 = event.heroTitleLine1 ?? split.line1;
  const titleLine2 = event.heroTitleLine2 ?? split.line2;
  const backgroundImageUrl =
    event.heroBackgroundImage?.url ?? event.images?.[0]?.url;

  return {
    eyebrow: event.heroEyebrow ?? "DriversClub Hessen präsentiert",
    titleLine1,
    titleLine2,
    dateLabel: event.heroDateLabel ?? formatWhen(event.date),
    countdownEndIso: event.heroCountdownEnd ?? event.date,
    badgeText: event.heroBadge ?? "Event",
    tagline: event.heroTagline ?? event.location,
    ctas: event.heroCtas?.length ? event.heroCtas : [...DEFAULT_CTAS],
    backgroundImageUrl,
  };
}
