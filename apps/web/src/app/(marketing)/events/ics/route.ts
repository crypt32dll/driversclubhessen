import { buildEventsIcsDocument } from "@/lib/calendar/build-events-ics";
import { eventService } from "@/lib/services/events";
import { NextResponse } from "next/server";

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

export async function GET() {
  const events = await eventService
    .getUpcomingEvents()
    .catch(
      () => [] as Awaited<ReturnType<typeof eventService.getUpcomingEvents>>,
    );
  const body = buildEventsIcsDocument(events);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
