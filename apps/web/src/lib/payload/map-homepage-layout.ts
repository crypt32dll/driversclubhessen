import type { Homepage, Media, Event as PayloadEvent } from "@/payload-types";
import type {
  Event,
  EventInfoCard,
  HomepageFeaturesBlockView,
  HomepageLayoutBlockView,
  HomepageLayoutView,
  HomepageLocationBlockView,
  HomepageSocialBlockView,
} from "@driversclub/shared";

import { formatEventDateTimeDe } from "@/lib/format-event-date";
import { mapPayloadEvent } from "@/lib/payload/map-event";
import { mapPayloadMediaToImage } from "@/lib/payload/map-media";

function nonEmptyString(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s.length > 0 ? s : undefined;
}

function formatFeaturedEventText(
  ev: PayloadEvent | null | undefined,
): string | undefined {
  if (!ev || typeof ev !== "object") return undefined;
  try {
    const mapped = mapPayloadEvent(ev);
    if (!mapped.date) {
      return [mapped.title, mapped.location].filter(Boolean).join(" · ");
    }
    const when = formatEventDateTimeDe(mapped.date);
    return [when, mapped.title, mapped.location].filter(Boolean).join(" · ");
  } catch {
    return undefined;
  }
}

function mapHeroBlock(
  b: Extract<NonNullable<Homepage["layout"]>[number], { blockType: "hero" }>,
): HomepageLayoutBlockView {
  let heroSourceEvent: Event | undefined;
  const heroRef = b.heroEvent;
  if (heroRef != null && typeof heroRef === "object" && "slug" in heroRef) {
    heroSourceEvent = mapPayloadEvent(heroRef as PayloadEvent);
  }

  return {
    blockType: "hero",
    id: nonEmptyString(b.id) ?? undefined,
    ...(heroSourceEvent ? { heroSourceEvent } : {}),
  };
}

function mapTickerBlock(
  b: Extract<NonNullable<Homepage["layout"]>[number], { blockType: "ticker" }>,
): HomepageLayoutBlockView {
  const rows = b.items;
  const items: string[] = [];
  if (Array.isArray(rows)) {
    for (const r of rows) {
      const t = nonEmptyString(r?.text);
      if (t) items.push(t);
    }
  }
  return {
    blockType: "ticker",
    id: nonEmptyString(b.id) ?? undefined,
    items,
  };
}

function mapEventBlock(
  b: Extract<NonNullable<Homepage["layout"]>[number], { blockType: "event" }>,
): HomepageLayoutBlockView {
  const cardsRaw = b.infoCards;
  const infoCards: EventInfoCard[] = [];
  if (Array.isArray(cardsRaw)) {
    for (const row of cardsRaw) {
      if (!row) continue;
      const icon = nonEmptyString(row.icon);
      const title = nonEmptyString(row.title);
      const value = nonEmptyString(row.value);
      const subRaw = nonEmptyString(row.sub);
      if (!icon || !title || !value) continue;
      const sub = subRaw ?? "";
      infoCards.push({
        icon,
        title,
        value,
        sub: sub.length > 0 ? sub : "\u2014",
      });
    }
  }

  const fe = b.featuredEvent;
  let featuredEventSlug: string | undefined;
  let featuredEventText: string | undefined;
  if (fe != null && typeof fe === "object") {
    featuredEventText = formatFeaturedEventText(fe as PayloadEvent);
    try {
      featuredEventSlug = mapPayloadEvent(fe as PayloadEvent).slug;
    } catch {
      featuredEventSlug = undefined;
    }
  }

  return {
    blockType: "event",
    id: nonEmptyString(b.id) ?? undefined,
    ...(nonEmptyString(b.sectionLabel)
      ? { sectionLabel: nonEmptyString(b.sectionLabel) }
      : {}),
    ...(nonEmptyString(b.titleLead)
      ? { titleLead: nonEmptyString(b.titleLead) }
      : {}),
    ...(nonEmptyString(b.titleAccent)
      ? { titleAccent: nonEmptyString(b.titleAccent) }
      : {}),
    ...(infoCards.length ? { infoCards } : {}),
    ...(featuredEventSlug ? { featuredEventSlug } : {}),
    ...(featuredEventText ? { featuredEventText } : {}),
  };
}

function mapFeaturesBlock(
  b: Extract<
    NonNullable<Homepage["layout"]>[number],
    { blockType: "features" }
  >,
): HomepageLayoutBlockView {
  const items: HomepageFeaturesBlockView["items"] = [];
  const raw = b.items;
  if (Array.isArray(raw)) {
    for (const row of raw) {
      if (!row) continue;
      const title = nonEmptyString(row.title);
      const description = nonEmptyString(row.description);
      if (!title || !description) continue;
      const icon = nonEmptyString(row.icon);
      let iconImage: HomepageFeaturesBlockView["items"][number]["iconImage"];
      const img = row.iconImage;
      if (img != null && typeof img === "object" && "url" in img) {
        const mapped = mapPayloadMediaToImage(img as Media);
        if (mapped) iconImage = mapped;
      }
      items.push({
        title,
        description,
        ...(icon ? { icon } : {}),
        ...(iconImage ? { iconImage } : {}),
      });
    }
  }

  return {
    blockType: "features",
    id: nonEmptyString(b.id) ?? undefined,
    ...(nonEmptyString(b.sectionLabel)
      ? { sectionLabel: nonEmptyString(b.sectionLabel) }
      : {}),
    ...(nonEmptyString(b.titleLead)
      ? { titleLead: nonEmptyString(b.titleLead) }
      : {}),
    ...(nonEmptyString(b.titleAccent)
      ? { titleAccent: nonEmptyString(b.titleAccent) }
      : {}),
    items,
  };
}

function mapRulesBlock(
  b: Extract<NonNullable<Homepage["layout"]>[number], { blockType: "rules" }>,
): HomepageLayoutBlockView {
  const items: { icon: string; text: string }[] = [];
  const raw = b.items;
  if (Array.isArray(raw)) {
    for (const row of raw) {
      if (!row) continue;
      const text = nonEmptyString(row.text);
      if (!text) continue;
      const icon = nonEmptyString(row.icon) ?? "✅";
      items.push({ icon, text });
    }
  }

  return {
    blockType: "rules",
    id: nonEmptyString(b.id) ?? undefined,
    ...(nonEmptyString(b.sectionLabel)
      ? { sectionLabel: nonEmptyString(b.sectionLabel) }
      : {}),
    ...(nonEmptyString(b.titleLead)
      ? { titleLead: nonEmptyString(b.titleLead) }
      : {}),
    ...(nonEmptyString(b.titleAccent)
      ? { titleAccent: nonEmptyString(b.titleAccent) }
      : {}),
    items,
  };
}

function mapAboutBlock(
  b: Extract<NonNullable<Homepage["layout"]>[number], { blockType: "about" }>,
): HomepageLayoutBlockView {
  return {
    blockType: "about",
    id: nonEmptyString(b.id) ?? undefined,
    ...(nonEmptyString(b.sectionLabel)
      ? { sectionLabel: nonEmptyString(b.sectionLabel) }
      : {}),
    ...(nonEmptyString(b.titleLead)
      ? { titleLead: nonEmptyString(b.titleLead) }
      : {}),
    ...(nonEmptyString(b.titleAccent)
      ? { titleAccent: nonEmptyString(b.titleAccent) }
      : {}),
    ...(nonEmptyString(b.leftBadge)
      ? { leftBadge: nonEmptyString(b.leftBadge) }
      : {}),
    ...(nonEmptyString(b.leftName)
      ? { leftName: nonEmptyString(b.leftName) }
      : {}),
    ...(nonEmptyString(b.rightBadge)
      ? { rightBadge: nonEmptyString(b.rightBadge) }
      : {}),
    ...(nonEmptyString(b.rightName)
      ? { rightName: nonEmptyString(b.rightName) }
      : {}),
    ...(nonEmptyString(b.body) ? { body: nonEmptyString(b.body) } : {}),
  };
}

function mapLocationBlock(
  b: Extract<
    NonNullable<Homepage["layout"]>[number],
    { blockType: "location" }
  >,
): HomepageLayoutBlockView {
  const rows: HomepageLocationBlockView["rows"] = [];
  const raw = b.rows;
  if (Array.isArray(raw)) {
    for (const row of raw) {
      if (!row) continue;
      const label = nonEmptyString(row.label);
      const value = nonEmptyString(row.value);
      if (!label || !value) continue;
      rows.push({
        label,
        value,
        ...(nonEmptyString(row.icon) ? { icon: nonEmptyString(row.icon) } : {}),
      });
    }
  }

  let mapImage: HomepageLocationBlockView["mapImage"];
  const mi = b.mapImage;
  if (mi != null && typeof mi === "object" && "url" in mi) {
    const mapped = mapPayloadMediaToImage(mi as Media);
    if (mapped) mapImage = mapped;
  }

  return {
    blockType: "location",
    id: nonEmptyString(b.id) ?? undefined,
    ...(nonEmptyString(b.sectionLabel)
      ? { sectionLabel: nonEmptyString(b.sectionLabel) }
      : {}),
    ...(nonEmptyString(b.titleLead)
      ? { titleLead: nonEmptyString(b.titleLead) }
      : {}),
    ...(nonEmptyString(b.titleAccent)
      ? { titleAccent: nonEmptyString(b.titleAccent) }
      : {}),
    ...(nonEmptyString(b.mapUrl) ? { mapUrl: nonEmptyString(b.mapUrl) } : {}),
    ...(mapImage ? { mapImage } : {}),
    ...(rows.length ? { rows } : {}),
  };
}

function mapSocialBlock(
  b: Extract<NonNullable<Homepage["layout"]>[number], { blockType: "social" }>,
): HomepageLayoutBlockView {
  const links: HomepageSocialBlockView["links"] = [];
  const raw = b.links;
  if (Array.isArray(raw)) {
    for (const row of raw) {
      if (!row) continue;
      const label = nonEmptyString(row.label);
      const href = nonEmptyString(row.url);
      if (!label || !href) continue;
      links.push({
        label,
        href,
        newTab: row.openInNewTab !== false,
      });
    }
  }

  return {
    blockType: "social",
    id: nonEmptyString(b.id) ?? undefined,
    ...(nonEmptyString(b.sectionLabel)
      ? { sectionLabel: nonEmptyString(b.sectionLabel) }
      : {}),
    ...(nonEmptyString(b.titleLead)
      ? { titleLead: nonEmptyString(b.titleLead) }
      : {}),
    ...(nonEmptyString(b.titleAccent)
      ? { titleAccent: nonEmptyString(b.titleAccent) }
      : {}),
    ...(nonEmptyString(b.intro) ? { intro: nonEmptyString(b.intro) } : {}),
    ...(links.length ? { links } : {}),
  };
}

export function mapPayloadHomepageLayout(
  global: Homepage,
): HomepageLayoutView | null {
  const raw = global.layout;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const blocks: HomepageLayoutBlockView[] = [];

  for (const b of raw) {
    if (!b || typeof b !== "object" || !("blockType" in b)) continue;
    switch (b.blockType) {
      case "hero":
        blocks.push(mapHeroBlock(b));
        break;
      case "ticker":
        blocks.push(mapTickerBlock(b));
        break;
      case "event":
        blocks.push(mapEventBlock(b));
        break;
      case "features":
        blocks.push(mapFeaturesBlock(b));
        break;
      case "rules":
        blocks.push(mapRulesBlock(b));
        break;
      case "about":
        blocks.push(mapAboutBlock(b));
        break;
      case "location":
        blocks.push(mapLocationBlock(b));
        break;
      case "social":
        blocks.push(mapSocialBlock(b));
        break;
      default:
        break;
    }
  }

  if (blocks.length === 0) return null;
  return { blocks };
}
