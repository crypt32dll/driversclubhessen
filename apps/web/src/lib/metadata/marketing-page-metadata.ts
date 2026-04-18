import { PAGE_SLUG_HOME } from "@/lib/cms/page-slug";
import { pagesService } from "@/lib/services/pages";
import type { Metadata } from "next";

/** Matches `(marketing)/layout.tsx` defaults when no CMS row exists. */
export const SITE_METADATA_DEFAULTS = {
  title: "DriversClub Hessen",
  description: "DriversClub Hessen - Tuning Treffen Community Plattform",
} as const;

/**
 * Maps a pathname (e.g. `/`, `/events`, `/events/foo`) to the CMS `pages.slug`
 * (`home`, `events`, `events/foo`).
 */
export function marketingPathToCmsSlug(pathname: string): string {
  const trimmed = pathname.trim();
  const noSlash = trimmed.replace(/^\/+|\/+$/g, "");
  if (noSlash.length === 0) return PAGE_SLUG_HOME;
  return noSlash.toLowerCase();
}

export async function marketingMetadataForPath(
  pathname: string,
  defaults: { title: string; description: string },
): Promise<Metadata> {
  const cmsSlug = marketingPathToCmsSlug(pathname);
  const row = await pagesService.getPageSeoBySlug(cmsSlug);
  const title = row?.metaTitle?.trim() || defaults.title;
  const description = row?.metaDescription?.trim() || defaults.description;
  return { title, description };
}
