import { REVALIDATE_TAGS } from "./isr-config.ts";
import {
  EVENTS_RSS_XML_PATH,
  MARKETING_STATIC_PATHS,
  SITEMAP_XML_PATH,
} from "./marketing-static-paths.ts";

/** Routes to refresh when the given cache tags are invalidated (ISR + RSC). */
export function pathsToRevalidateForTags(tags: string[]): string[] {
  const out = new Set<string>();
  if (tags.includes(REVALIDATE_TAGS.events)) {
    out.add("/");
    out.add("/events");
    out.add(SITEMAP_XML_PATH);
    out.add(EVENTS_RSS_XML_PATH);
  }
  if (tags.includes(REVALIDATE_TAGS.homepage)) {
    out.add("/");
    out.add("/events");
    out.add("/gallery");
  }
  if (tags.includes(REVALIDATE_TAGS.gallery)) {
    out.add("/gallery");
  }
  if (tags.includes(REVALIDATE_TAGS.navigation)) {
    for (const p of MARKETING_STATIC_PATHS) {
      out.add(p);
    }
  }
  if (tags.includes(REVALIDATE_TAGS.communityFaq)) {
    out.add("/faq");
  }
  if (tags.includes(REVALIDATE_TAGS.legalImpressum)) {
    out.add("/legal/impressum");
  }
  if (tags.includes(REVALIDATE_TAGS.legalDatenschutz)) {
    out.add("/legal/datenschutz");
  }
  if (tags.includes(REVALIDATE_TAGS.cookieBanner)) {
    out.add("/");
    out.add("/faq");
    out.add("/legal/impressum");
    out.add("/legal/datenschutz");
  }
  return [...out];
}

/** After an event document change, also bust the detail route when known. */
export function pathsWhenEventsCollectionChanged(
  slug?: string | null,
): string[] {
  const paths = pathsToRevalidateForTags([REVALIDATE_TAGS.events]);
  if (typeof slug === "string" && slug.length > 0) {
    paths.push(`/events/${slug}`);
  }
  return [...new Set(paths)];
}
