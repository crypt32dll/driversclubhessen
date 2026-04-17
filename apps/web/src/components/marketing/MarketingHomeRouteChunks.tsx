import dynamic from "next/dynamic";
import type { Event, Homepage } from "@driversclub/shared";

/**
 * Route-level code splitting: each section loads in its own chunk (similar intent to
 * route-based lazy loading with React.lazy, but using `next/dynamic` for App Router).
 * Prefer hooks over render props for shared logic; this file only splits bundles.
 */
function ChunkFallback({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ minHeight: "3rem", padding: "0.75rem 0" }}
    >
      Lade {label}…
    </div>
  );
}

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection").then((m) => m.HeroSection),
  { loading: () => <ChunkFallback label="Hero" /> },
);

const Ticker = dynamic(
  () => import("@/components/sections/Ticker").then((m) => m.Ticker),
  { loading: () => <ChunkFallback label="Ticker" /> },
);

const UpcomingEventsSection = dynamic(
  () =>
    import("@/components/sections/UpcomingEventsSection").then(
      (m) => m.UpcomingEventsSection,
    ),
  { loading: () => <ChunkFallback label="Events" /> },
);

const MarketingSections = dynamic(
  () =>
    import("@/components/sections/MarketingSections").then(
      (m) => m.MarketingSections,
    ),
  { loading: () => <ChunkFallback label="Inhalte" /> },
);

type Props = {
  homepage: Homepage;
  events: Event[];
};

export function MarketingHomeRouteChunks({ homepage, events }: Props) {
  return (
    <>
      <HeroSection
        eyebrow={homepage.heroEyebrow}
        titleLine1={homepage.heroTitleLine1}
        titleLine2={homepage.heroTitleLine2}
        dateLabel={homepage.heroDateLabel}
        countdownEndIso={homepage.heroCountdownEnd ?? "2026-04-19T12:00:00"}
      />
      <Ticker />
      <UpcomingEventsSection
        featuredEventText={homepage.featuredEventText}
        events={events}
      />
      <MarketingSections cmsSections={homepage.sections} />
    </>
  );
}
