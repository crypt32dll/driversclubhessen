import { MarketingHomeRouteChunks } from "@/components/marketing/MarketingHomeRouteChunks";
import { eventService } from "@/lib/services/events";
import { homepageService } from "@/lib/services/homepage";
import { marketingHome } from "@/styles/global.css";

/**
 * Route-level ISR window (seconds). Next.js 16 only accepts a **numeric literal** here (see invalid-page-config).
 * Per-request Strapi `fetch` TTL still follows `STRAPI_ISR_REVALIDATE_SECONDS` in `api/client.ts`.
 */
export const revalidate = 3600;

export default async function MarketingPage() {
  const [homepage, events] = await Promise.all([
    homepageService.getHomepage(),
    eventService.getUpcomingEvents(),
  ]);

  return (
    <main className={marketingHome}>
      <MarketingHomeRouteChunks homepage={homepage} events={events} />
    </main>
  );
}
