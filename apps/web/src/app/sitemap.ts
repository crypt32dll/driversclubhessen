import {
  MARKETING_STATIC_PATHS,
  marketingPathSitemapPriority,
} from "@/lib/cms/marketing-static-paths";
import { eventService } from "@/lib/services/events";
import { getMarketingSiteOrigin } from "@/lib/site-origin";
import type { MetadataRoute } from "next";

/** ISR — konsistent mit Marketing-Routen. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getMarketingSiteOrigin();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = MARKETING_STATIC_PATHS.map(
    (path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: marketingPathSitemapPriority(path),
    }),
  );

  const slugs = await eventService.getPublishedEventSlugs().catch(() => []);
  const eventEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/events/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...eventEntries];
}
