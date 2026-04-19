import { formatEventDateTimeDe } from "@/lib/format-event-date";
import { getMarketingSiteOrigin } from "@/lib/site-origin";
import type { Event } from "@driversclub/shared";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822Date(iso: string | undefined): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toUTCString();
}

/**
 * RSS 2.0 Feed für kommende Events (Metadaten, geringer Traffic).
 */
export function buildEventsRssXml(events: Event[], feedPath: string): string {
  const base = getMarketingSiteOrigin();
  const channelLink = `${base}/events`;
  const selfUrl = `${base}${feedPath}`;
  const lastBuild = rfc822Date(new Date().toISOString());

  const items = events
    .map((e) => {
      const link = `${base}/events/${e.slug}`;
      const pub = rfc822Date(e.createdAt ?? e.date);
      const desc = `${formatEventDateTimeDe(e.date)} · ${e.location.trim()}`;
      return `
    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escapeXml(desc)}</description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DriversClub Hessen — Events</title>
    <link>${escapeXml(channelLink)}</link>
    <description>Anstehende Events von DriversClub Hessen</description>
    <language>de-DE</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
