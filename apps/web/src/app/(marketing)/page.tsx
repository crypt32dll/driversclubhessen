import { RenderBlocks } from "@/components/homepage/RenderBlocks";
import {
  marketingMetadataForPath,
  SITE_METADATA_DEFAULTS,
} from "@/lib/metadata/marketing-page-metadata";
import { eventService } from "@/lib/services/events";
import { homepageService } from "@/lib/services/homepage";
import { marketingHome } from "@/styles/global.css";
import type { Metadata } from "next";

/**
 * Route-level ISR window (seconds). Next.js 16 only accepts a **numeric literal** here (see invalid-page-config).
 * Tag-based revalidation uses `CMS_ISR_REVALIDATE_SECONDS` / `unstable_cache` in services (see `lib/cms/isr-config.ts`).
 */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadataForPath("/", SITE_METADATA_DEFAULTS);
}

export default async function MarketingPage() {
  const [bundle, events] = await Promise.all([
    homepageService.getHomepageBundle(),
    eventService.getUpcomingEvents(),
  ]);
  const nextEvent = events[0] ?? null;

  return (
    <main className={marketingHome}>
      <RenderBlocks
        blocks={bundle.layout.blocks}
        events={events}
        nextEvent={nextEvent}
      />
    </main>
  );
}
