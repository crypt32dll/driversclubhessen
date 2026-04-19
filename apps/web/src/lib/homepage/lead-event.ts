import type { Event, HomepageLayoutBlockView } from "@driversclub/shared";

/**
 * Single “lead” event for homepage hero + event section: explicit hero pick, else next upcoming.
 */
export function resolveLeadEvent(
  blocks: HomepageLayoutBlockView[],
  nextEvent: Event | null,
): Event | null {
  const hero = blocks.find(
    (b): b is Extract<HomepageLayoutBlockView, { blockType: "hero" }> =>
      b.blockType === "hero",
  );
  if (hero?.heroSourceEvent) return hero.heroSourceEvent;
  return nextEvent;
}
