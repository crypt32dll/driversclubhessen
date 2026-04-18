import { eventService } from "@/lib/services/events";
import { homepageService } from "@/lib/services/homepage";
import type { Metadata } from "next";

import {
  ogTwitterForRoute,
  pickEventShareImageUrl,
} from "@/lib/metadata/og-twitter";

export { SITE_METADATA_DEFAULTS } from "@/lib/metadata/site-defaults";

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
    const title = s.homeMetaTitle ?? defaults.title;
    const description = s.homeMetaDescription ?? defaults.description;
    return {
      title,
      description,
      ...ogTwitterForRoute(path, title, description),
    };
  }

  if (path === "/events") {
    const { marketingSeo: s } = await homepageService.getHomepageBundle();
    const title = s.eventsIndexMetaTitle ?? defaults.title;
    const description = s.eventsIndexMetaDescription ?? defaults.description;
    return {
      title,
      description,
      ...ogTwitterForRoute(path, title, description),
    };
  }

  if (path === "/gallery") {
    const { marketingSeo: s } = await homepageService.getHomepageBundle();
    const title = s.galleryMetaTitle ?? defaults.title;
    const description = s.galleryMetaDescription ?? defaults.description;
    return {
      title,
      description,
      ...ogTwitterForRoute(path, title, description),
    };
  }

  const m = /^\/events\/([^/]+)$/.exec(path);
  if (m) {
    const slug = m[1];
    const ev = await eventService.getEventBySlug(slug).catch(() => null);
    const title = ev?.metaTitle?.trim() || defaults.title;
    const description = ev?.metaDescription?.trim() || defaults.description;
    const shareImageUrl = pickEventShareImageUrl(ev);
    return {
      title,
      description,
      ...ogTwitterForRoute(path, title, description, {
        ...(shareImageUrl ? { shareImageUrl } : {}),
      }),
    };
  }

  return {
    title: defaults.title,
    description: defaults.description,
    ...ogTwitterForRoute(path, defaults.title, defaults.description),
  };
}
