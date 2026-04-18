import { EventDetailMedia } from "@/components/events/EventDetailMedia";
import { HeroSection } from "@/components/sections/HeroSection";
import { marketingMetadataForPath } from "@/lib/metadata/marketing-page-metadata";
import { formatEventDateTimeDe } from "@/lib/format-event-date";
import { mapEventToHeroProps } from "@/lib/map-event-detail-hero";
import { eventService } from "@/lib/services/events";
import { marketingHome } from "@/styles/global.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await eventService.getEventBySlug(slug).catch(() => null);
  const when = event ? formatEventDateTimeDe(event.date) : null;
  return marketingMetadataForPath(`/events/${slug}`, {
    title: event ? `${event.title} | DriversClub Hessen` : "Event | DriversClub Hessen",
    description: event
      ? `${event.title}${when ? ` — ${when}` : ""}${event.location ? ` · ${event.location}` : ""}.`
      : "Event-Details bei DriversClub Hessen.",
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await eventService.getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const hero = mapEventToHeroProps(event);

  return (
    <main className={marketingHome}>
      <HeroSection
        eyebrow={hero.eyebrow}
        titleLine1={hero.titleLine1}
        titleLine2={hero.titleLine2}
        dateLabel={hero.dateLabel}
        countdownEndIso={hero.countdownEndIso}
        badgeText={hero.badgeText}
        tagline={hero.tagline}
        ctas={hero.ctas}
        backgroundImageUrl={hero.backgroundImageUrl}
      />
      <EventDetailMedia event={event} />
    </main>
  );
}
