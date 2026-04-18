import type { Navigation as PayloadNavigation } from "@/payload-types";
import type { SiteNavItem, SiteNavigation } from "@driversclub/shared";

const INTERNAL_HREF: Record<string, string> = {
  home: "/",
  homeEvent: "/#aktuell",
  homeAbout: "/#about",
  homeLocation: "/#location",
  homeSocial: "/#social",
  events: "/events",
  gallery: "/gallery",
  faq: "/faq",
  impressum: "/legal/impressum",
  datenschutz: "/legal/datenschutz",
};

function resolveHref(
  row: NonNullable<PayloadNavigation["items"]>[number],
): string | undefined {
  if (row.linkType === "external") {
    const u = typeof row.externalUrl === "string" ? row.externalUrl.trim() : "";
    return u.length > 0 ? u : undefined;
  }
  const key = row.internalTarget ?? "home";
  return INTERNAL_HREF[key] ?? "/";
}

export function mapPayloadNavigation(
  global: PayloadNavigation,
): SiteNavigation {
  const raw = global.items;
  const items: SiteNavItem[] = [];
  if (Array.isArray(raw)) {
    for (const row of raw) {
      if (!row) continue;
      const label = typeof row.label === "string" ? row.label.trim() : "";
      if (!label) continue;
      const href = resolveHref(row);
      if (!href) continue;
      const external = row.linkType === "external";
      const item: SiteNavItem = { label, href, external };
      items.push(item);
    }
  }
  return { items };
}
