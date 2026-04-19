import { EventDetailExtras } from "@/components/events/EventDetailExtras";
import { EventDetailMedia } from "@/components/events/EventDetailMedia";
import {
  EventShareButton,
  eventDetailMainWithFab,
} from "@/components/events/EventShareButton";
import { HeroSection } from "@/components/sections/HeroSection";
import { formatEventDateTimeDe } from "@/lib/format-event-date";
import { mapEventToHeroProps } from "@/lib/map-event-detail-hero";
import { marketingMetadataForPath } from "@/lib/metadata/marketing-page-metadata";
import { buildEventJsonLd } from "@/lib/seo/event-json-ld";
import { getCachedEventBySlug } from "@/lib/services/event-detail";
import { eventService } from "@/lib/services/events";
import { getMarketingSiteOrigin } from "@/lib/site-origin";
import { marketingHome } from "@/styles/global.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await eventService.getPublishedEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getCachedEventBySlug(slug).catch(() => null);
  const when = event ? formatEventDateTimeDe(event.date) : null;
  return marketingMetadataForPath(`/events/${slug}`, {
    title: event
      ? `${event.title} | DriversClub Hessen`
      : "Event | DriversClub Hessen",
    description: event
      ? `${event.title}${when ? ` — ${when}` : ""}${event.location ? ` · ${event.location}` : ""}.`
      : "Event-Details bei DriversClub Hessen.",
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getCachedEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const hero = mapEventToHeroProps(event);
  const siteOrigin = getMarketingSiteOrigin();
  const canonicalUrl = `${siteOrigin}/events/${slug}`;
  const jsonLd = buildEventJsonLd(event, canonicalUrl);

  return (
    <main className={marketingHome}>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from server-built schema object (no user HTML).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        priorityBackground
      />
      <EventShareButton title={event.title} url={canonicalUrl} />
      <EventDetailExtras event={event} />
      <EventDetailMedia event={event} />
    </main>
  );
}
