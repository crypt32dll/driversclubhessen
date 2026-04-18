import {
  eventCard,
  eventCardMeta,
  eventCardTitle,
  eventGrid,
  intro,
  kicker,
  lede,
  main,
  title,
} from "@/components/marketing/MarketingListPage.css";
import { Container } from "@/components/ui/Container";
import {
  marketingMetadataForPath,
  SITE_METADATA_DEFAULTS,
} from "@/lib/metadata/marketing-page-metadata";
import { formatEventDateTimeDe } from "@/lib/format-event-date";
import { eventService } from "@/lib/services/events";
import type { Metadata } from "next";
import Link from "next/link";

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
        </header>
        {events.length === 0 ? (
          <p className={lede}>Aktuell sind keine Events verfuegbar.</p>
        ) : (
          <div className={eventGrid}>
            {events.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className={eventCard}
              >
                <h2 className={eventCardTitle}>{event.title}</h2>
                <p className={eventCardMeta}>
                  {formatEventDateTimeDe(event.date)}
                </p>
                <p className={eventCardMeta}>{event.location}</p>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
