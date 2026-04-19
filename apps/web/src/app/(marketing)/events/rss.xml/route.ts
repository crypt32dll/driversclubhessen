import { EVENTS_RSS_XML_PATH } from "@/lib/cms/marketing-static-paths";
import { buildEventsRssXml } from "@/lib/rss/build-events-rss";
import { eventService } from "@/lib/services/events";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const events = await eventService.getUpcomingEvents().catch(() => []);
  const body = buildEventsRssXml(events, EVENTS_RSS_XML_PATH);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
