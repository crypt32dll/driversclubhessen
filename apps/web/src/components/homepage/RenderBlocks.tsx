import { HeroSection } from "@/components/sections/HeroSection";
import { Ticker } from "@/components/sections/Ticker";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { mergeHomepageHero } from "@/lib/event-hero";
import { resolveLeadEvent } from "@/lib/homepage/lead-event";
import type { Event, HomepageLayoutBlockView } from "@driversclub/shared";

import { HomepageAboutBlock } from "./blocks/HomepageAboutBlock";
import { HomepageFeaturesBlock } from "./blocks/HomepageFeaturesBlock";
import { HomepageLocationBlock } from "./blocks/HomepageLocationBlock";
import { HomepageRulesBlock } from "./blocks/HomepageRulesBlock";
import { HomepageSocialBlock } from "./blocks/HomepageSocialBlock";

export type RenderBlocksProps = {
  blocks: HomepageLayoutBlockView[];
  /** Next upcoming event (`getUpcomingEvents()[0]`). Hero + event section use `resolveLeadEvent`. */
  nextEvent: Event | null;
};

export function RenderBlocks({ blocks, nextEvent }: RenderBlocksProps) {
  const firstHeroIndex = blocks.findIndex((b) => b.blockType === "hero");
  const leadEvent = resolveLeadEvent(blocks, nextEvent);

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
                heroPastFeatured={merged.heroPastFeatured}
                heroShowActions={merged.heroShowActions ?? true}
                tagline={merged.tagline}
                ctas={merged.ctas}
                backgroundImageUrl={merged.backgroundImageUrl}
                priorityBackground={index === firstHeroIndex}
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
                leadEvent={leadEvent}
                sectionLabelText={
                  leadEvent?.homeEventSectionLabel ?? block.sectionLabel
                }
                titleLead={leadEvent?.homeEventTitleLead ?? block.titleLead}
                titleAccent={
                  leadEvent?.homeEventTitleAccent ?? block.titleAccent
                }
                eventInfoCards={block.infoCards}
              />
            );
          case "features":
            return <HomepageFeaturesBlock key={key} block={block} />;
          case "rules":
            return <HomepageRulesBlock key={key} block={block} />;
          case "about":
            return (
              <HomepageAboutBlock
                key={key}
                block={block}
                leadEvent={leadEvent}
              />
            );
          case "location":
            return (
              <HomepageLocationBlock
                key={key}
                block={block}
                leadEvent={leadEvent}
              />
            );
          case "social":
            return <HomepageSocialBlock key={key} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
