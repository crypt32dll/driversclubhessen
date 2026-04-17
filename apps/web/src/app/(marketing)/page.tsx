import { HeroSection } from "@/components/sections/HeroSection";
import { MarketingSections } from "@/components/sections/MarketingSections";
import { Ticker } from "@/components/sections/Ticker";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { eventService } from "@/lib/services/events";
import { homepageService } from "@/lib/services/homepage";
import { STRAPI_ISR_SECONDS } from "@/lib/strapi/isr-config";
import { marketingHome } from "@/styles/global.css";
import type { Event } from "@driversclub/shared";

/** Route segment ISR fallback; on-demand updates via `/api/revalidate` + Strapi webhooks. */
export const revalidate = STRAPI_ISR_SECONDS;

export default async function MarketingPage() {
  const [homepage, events] = await Promise.all([
    homepageService.getHomepage(),
    eventService.getUpcomingEvents().catch(() => [] as Event[]),
  ]);

  return (
    <main className={marketingHome}>
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
    </main>
  );
}
