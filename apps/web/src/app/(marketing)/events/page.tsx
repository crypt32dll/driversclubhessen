import {
  eventCard,
  eventCardBadge,
  eventCardBadgeMuted,
  eventCardMeta,
  eventCardTitle,
  eventCardTitleRow,
  eventGrid,
  intro,
  introFeedLinks,
  kicker,
  lede,
  main,
  title,
} from "@/components/marketing/MarketingListPage.css";
import { Container } from "@/components/ui/Container";
import { EVENTS_RSS_XML_PATH } from "@/lib/cms/marketing-static-paths";
import { formatEventDateTimeDe } from "@/lib/format-event-date";
import {
  SITE_METADATA_DEFAULTS,
  marketingMetadataForPath,
} from "@/lib/metadata/marketing-page-metadata";
import { eventService } from "@/lib/services/events";
import type { Event } from "@driversclub/shared";
import type { Metadata } from "next";
import Link from "next/link";

function listBadge(event: Event): { label: string; muted: boolean } | null {
  if (event.status === "sold_out")
    return { label: "Ausverkauft", muted: false };
  if (event.status === "planned") return { label: "Geplant", muted: true };
  return null;
}

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadataForPath("/events", {
    title: `Events | ${SITE_METADATA_DEFAULTS.title}`,
    description:
      "Anstehende Tuning-Treffen und Community-Events von DriversClub Hessen — sortiert nach Datum.",
  });
}

export default async function EventsPage() {
  const events = await eventService.getUpcomingEvents().catch(() => []);

  return (
    <main className={main}>
      <Container>
        <header className={intro}>
          <p className={kicker}>Events</p>
          <h1 className={title}>Anstehende Treffen</h1>
          <p className={lede}>
            Alle kommenden Events — sortiert nach Datum. Details und Anmeldung
            auf der jeweiligen Event-Seite.
          </p>
          <p className={`${lede} ${introFeedLinks}`}>
            <Link href="/events/ics">Kalender-Feed (.ics)</Link>
            {" · "}
            <Link href={EVENTS_RSS_XML_PATH}>RSS-Feed</Link>
          </p>
        </header>
        {events.length === 0 ? (
          <p className={lede}>Aktuell sind keine Events verfuegbar.</p>
        ) : (
          <div className={eventGrid}>
            {events.map((event) => {
              const badge = listBadge(event);
              return (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className={eventCard}
                >
                  <div className={eventCardTitleRow}>
                    <h2 className={eventCardTitle}>{event.title}</h2>
                    {badge ? (
                      <span
                        className={
                          badge.muted ? eventCardBadgeMuted : eventCardBadge
                        }
                      >
                        {badge.label}
                      </span>
                    ) : null}
                  </div>
                  <p className={eventCardMeta}>
                    {formatEventDateTimeDe(event.date)}
                  </p>
                  <p className={eventCardMeta}>{event.location}</p>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}
