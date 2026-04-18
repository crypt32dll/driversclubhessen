import { HeroSection } from "@/components/sections/HeroSection";
import { Ticker } from "@/components/sections/Ticker";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { mergeHomepageHero } from "@/lib/event-hero";
import type { Event } from "@driversclub/shared";
import type { HomepageLayoutBlockView } from "@driversclub/shared";

import { HomepageAboutBlock } from "./blocks/HomepageAboutBlock";
import { HomepageFeaturesBlock } from "./blocks/HomepageFeaturesBlock";
import { HomepageLocationBlock } from "./blocks/HomepageLocationBlock";
import { HomepageRulesBlock } from "./blocks/HomepageRulesBlock";
import { HomepageSocialBlock } from "./blocks/HomepageSocialBlock";

export type RenderBlocksProps = {
  blocks: HomepageLayoutBlockView[];
  events: Event[];
  /** Next upcoming event (same as `events[0]` when `getUpcomingEvents()` is used). Drives the hero when present. */
  nextEvent: Event | null;
};

export function RenderBlocks({ blocks, events, nextEvent }: RenderBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`;
        switch (block.blockType) {
          case "hero": {
            const merged = mergeHomepageHero(block, nextEvent);
            return (
              <HeroSection
                key={key}
                eyebrow={merged.eyebrow}
                titleLine1={merged.titleLine1}
                titleLine2={merged.titleLine2}
                dateLabel={merged.dateLabel}
                countdownEndIso={merged.countdownEndIso}
                badgeText={merged.badgeText}
                tagline={merged.tagline}
                ctas={merged.ctas}
                backgroundImageUrl={merged.backgroundImageUrl}
              />
            );
          }
          case "ticker":
            return (
              <Ticker
                key={key}
                items={block.items.length ? block.items : undefined}
              />
            );
          case "event":
            return (
              <UpcomingEventsSection
                key={key}
                featuredEventText={block.featuredEventText}
                events={events}
                sectionLabelText={block.sectionLabel}
                titleLead={block.titleLead}
                titleAccent={block.titleAccent}
                eventInfoCards={block.infoCards}
              />
            );
          case "features":
            return <HomepageFeaturesBlock key={key} block={block} />;
          case "rules":
            return <HomepageRulesBlock key={key} block={block} />;
          case "about":
            return <HomepageAboutBlock key={key} block={block} />;
          case "location":
            return <HomepageLocationBlock key={key} block={block} />;
          case "social":
            return <HomepageSocialBlock key={key} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
