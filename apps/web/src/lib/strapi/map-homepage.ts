import type { Homepage, HomepageSection } from "@driversclub/shared";

import { mapStrapiEventFromRest } from "@/lib/strapi/map-event";

function flattenStrapiEntry(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  const o = raw as Record<string, unknown>;
  if (o.attributes && typeof o.attributes === "object") {
    return { ...o, ...(o.attributes as Record<string, unknown>) };
  }
  return o;
}

function unwrapOneRelation(val: unknown): Record<string, unknown> | null {
  if (val === null || val === undefined) return null;
  if (typeof val !== "object") return null;
  const o = val as Record<string, unknown>;
  if ("data" in o) {
    const d = o.data;
    if (d === null || d === undefined) return null;
    if (Array.isArray(d)) {
      const first = d[0];
      return first ? flattenStrapiEntry(first) : null;
    }
    return flattenStrapiEntry(d);
  }
  return flattenStrapiEntry(o);
}

function normalizeSections(raw: unknown): HomepageSection[] {
  if (!raw) return [];
  let list: unknown[] = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === "object" && raw !== null && "data" in raw) {
    const d = (raw as { data: unknown }).data;
    if (Array.isArray(d)) list = d;
  }
  if (list.length === 0) return [];
  return list
    .map((item) => {
      const x = flattenStrapiEntry(item);
      if (!x.title && !x.description) return null;
      return {
        title: String(x.title ?? ""),
        description:
          x.description !== null && x.description !== undefined
            ? String(x.description)
            : undefined,
        order: typeof x.order === "number" ? x.order : 0,
      };
    })
    .filter((x): x is HomepageSection => x !== null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function formatFeaturedEventText(
  raw: Record<string, unknown> | null,
): string | undefined {
  if (!raw) return undefined;
  try {
    const ev = mapStrapiEventFromRest(raw);
    if (!ev.date) {
      return [ev.title, ev.location].filter(Boolean).join(" · ");
    }
    const when = new Date(ev.date).toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    return [when, ev.title, ev.location].filter(Boolean).join(" · ");
  } catch {
    return undefined;
  }
}

const HOMEPAGE_DEFAULTS: Pick<
  Homepage,
  "heroEyebrow" | "heroTitleLine1" | "heroTitleLine2" | "heroDateLabel"
> = {
  heroEyebrow: "Mi Familia & Friends praesentiert",
  heroTitleLine1: "Tuning",
  heroTitleLine2: "Treffen",
  heroDateLabel: "19 · 04 · 2026",
};

/**
 * Maps Strapi REST `GET /api/homepage` `data` (single type) into the shared `Homepage` shape.
 */
export function mapHomepageFromRest(raw: unknown): Homepage {
  const r = flattenStrapiEntry(raw);
  const hero = r.hero ? flattenStrapiEntry(r.hero) : {};

  const heroEyebrow = String(hero.eyebrow ?? HOMEPAGE_DEFAULTS.heroEyebrow);
  const heroTitleLine1 = String(
    hero.titleLine1 ?? HOMEPAGE_DEFAULTS.heroTitleLine1,
  );
  const heroTitleLine2 = String(
    hero.titleLine2 ?? HOMEPAGE_DEFAULTS.heroTitleLine2,
  );
  const heroDateLabel = String(
    hero.dateLabel ?? HOMEPAGE_DEFAULTS.heroDateLabel,
  );

  let heroCountdownEnd: string | undefined;
  const ce = hero.countdownEnd;
  if (typeof ce === "string" && ce.length > 0) {
    heroCountdownEnd = ce;
  } else if (ce instanceof Date) {
    heroCountdownEnd = ce.toISOString();
  }

  const featuredRaw = unwrapOneRelation(r.featuredEvent);
  const featuredEventText = formatFeaturedEventText(featuredRaw);

  const sections = normalizeSections(r.sections);

  return {
    heroEyebrow,
    heroTitleLine1,
    heroTitleLine2,
    heroDateLabel,
    heroCountdownEnd,
    featuredEventText,
    sections: sections.length ? sections : undefined,
  };
}
