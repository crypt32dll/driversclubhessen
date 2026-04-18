import { buildEventsIcsDocument } from "@/lib/calendar/build-events-ics";
import { getCachedEventBySlug } from "@/lib/services/event-detail";
import { NextResponse } from "next/server";

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const event = await getCachedEventBySlug(slug).catch(() => null);
  if (!event || event.status === "cancelled") {
    return new NextResponse("Not found", { status: 404 });
  }
  const body = buildEventsIcsDocument([event]);
  const safe = slug.replace(/[^a-z0-9-]+/gi, "-").slice(0, 80) || "event";
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safe}.ics"`,
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
