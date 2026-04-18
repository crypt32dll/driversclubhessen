import { eventService } from "@/lib/services/events";
import { homepageService } from "@/lib/services/homepage";
import type { Metadata } from "next";

/** Matches `(marketing)/layout.tsx` defaults when no CMS row exists. */
export const SITE_METADATA_DEFAULTS = {
  title: "DriversClub Hessen",
  description: "DriversClub Hessen - Tuning Treffen Community Plattform",
} as const;

function normalizePath(pathname: string): string {
  const t = pathname.trim();
  if (!t || t === "/") return "/";
  return t.replace(/\/+$/, "") || "/";
}

/**
 * Resolves `<title>` and meta description from Payload:
 * - `/` — Homepage global (collapsible „SEO — Startseite“)
 * - `/events` — Homepage global („SEO — Events-Übersicht“)
 * - `/gallery` — Homepage global („SEO — Galerie“)
 * - `/events/[slug]` — Event document („SEO — Event-Detail“)
 * - other paths — use `defaults` only (e.g. legal pages)
 */
export async function marketingMetadataForPath(
  pathname: string,
  defaults: { title: string; description: string },
): Promise<Metadata> {
  const path = normalizePath(pathname);

  if (path === "/") {
    const { marketingSeo: s } = await homepageService.getHomepageBundle();
    return {
      title: s.homeMetaTitle ?? defaults.title,
      description: s.homeMetaDescription ?? defaults.description,
    };
  }

  if (path === "/events") {
    const { marketingSeo: s } = await homepageService.getHomepageBundle();
    return {
      title: s.eventsIndexMetaTitle ?? defaults.title,
      description: s.eventsIndexMetaDescription ?? defaults.description,
    };
  }

  if (path === "/gallery") {
    const { marketingSeo: s } = await homepageService.getHomepageBundle();
    return {
      title: s.galleryMetaTitle ?? defaults.title,
      description: s.galleryMetaDescription ?? defaults.description,
    };
  }

  const m = /^\/events\/([^/]+)$/.exec(path);
  if (m) {
    const slug = m[1];
    const ev = await eventService.getEventBySlug(slug).catch(() => null);
    return {
      title: ev?.metaTitle?.trim() || defaults.title,
      description: ev?.metaDescription?.trim() || defaults.description,
    };
  }

  return { title: defaults.title, description: defaults.description };
}
