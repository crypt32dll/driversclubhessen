import {
  eventCard,
  eventCardBadge,
  eventCardBadgeMuted,
  eventCardBody,
  eventCardIcs,
  eventCardMeta,
  eventCardShell,
  eventCardTitle,
  eventCardTitleRow,
  eventGrid,
  intro,
  kicker,
  lede,
  listingBlock,
  main,
  subsectionTitle,
  title,
} from "@/components/marketing/MarketingListPage.css";
import { Container } from "@/components/ui/Container";
import { EVENTS_ICS_FEED_PATH } from "@/lib/cms/marketing-static-paths";
import { formatEventDateTimeDe } from "@/lib/format-event-date";
import {
  SITE_METADATA_DEFAULTS,
  marketingMetadataForPath,
} from "@/lib/metadata/marketing-page-metadata";
import {
  eventService,
  isMarketingEventEligibleForIcs,
} from "@/lib/services/events";
import type { Event } from "@driversclub/shared";
import type { Metadata } from "next";
import Link from "next/link";

function listBadge(
  event: Event,
  { isPast }: { isPast: boolean },
): { label: string; muted: boolean } | null {
  if (event.status === "sold_out")
    return { label: "Ausverkauft", muted: false };
  if (event.status === "planned") {
    if (isPast) return null;
    return { label: "Geplant", muted: true };
  }
  return null;
}

function EventListingCardActive({ event }: { event: Event }) {
  const badge = listBadge(event, { isPast: false });
  const icsHref = `/events/${event.slug}/ics`;
  return (
    <div className={eventCardShell}>
      <Link href={`/events/${event.slug}`} className={eventCardBody}>
        <div className={eventCardTitleRow}>
          <h3 className={eventCardTitle}>{event.title}</h3>
          {badge ? (
            <span
              className={badge.muted ? eventCardBadgeMuted : eventCardBadge}
            >
              {badge.label}
            </span>
          ) : null}
        </div>
        <p className={eventCardMeta}>{formatEventDateTimeDe(event.date)}</p>
        <p className={eventCardMeta}>{event.location}</p>
      </Link>
      {isMarketingEventEligibleForIcs(event) ? (
        <Link href={icsHref} className={eventCardIcs} prefetch={false}>
          In Kalender speichern (.ics)
        </Link>
      ) : null}
    </div>
  );
}

function EventListingCardPast({ event }: { event: Event }) {
  const badge = listBadge(event, { isPast: true });
  return (
    <Link href={`/events/${event.slug}`} className={eventCard}>
      <div className={eventCardTitleRow}>
        <h3 className={eventCardTitle}>{event.title}</h3>
        {badge ? (
          <span
            className={badge.muted ? eventCardBadgeMuted : eventCardBadge}
          >
            {badge.label}
          </span>
        ) : null}
      </div>
      <p className={eventCardMeta}>{formatEventDateTimeDe(event.date)}</p>
      <p className={eventCardMeta}>{event.location}</p>
    </Link>
  );
}

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadataForPath("/events", {
    title: `Events | ${SITE_METADATA_DEFAULTS.title}`,
    description:
      "Anstehende und vergangene Tuning-Treffen von DriversClub Hessen — sortiert nach Datum.",
  });
}

export default async function EventsPage() {
  const { active, past } = await eventService.getEventListingPartitions();

  return (
    <main className={main}>
      <Container>
        <header className={intro}>
          <p className={kicker}>Events</p>
          <h1 className={title}>Treffen & Termine</h1>
          <p className={lede}>
            Kommende und vergangene Events — sortiert nach Datum. Details auf
            der jeweiligen Event-Seite.
          </p>
        </header>

        {active.length === 0 && past.length === 0 ? (
          <p className={lede}>Aktuell sind keine Events verfuegbar.</p>
        ) : (
          <>
            <section aria-labelledby="events-active-heading">
              <h2 className={subsectionTitle} id="events-active-heading">
                Aktive & anstehende Events
              </h2>
              {active.length > 0 ? (
                <>
                  <p className={lede}>
                    Anstehende Termine kannst du in deinen Kalender übernehmen:{" "}
                    <Link href={EVENTS_ICS_FEED_PATH} prefetch={false}>
                      Alle anstehenden Events (.ics)
                    </Link>{" "}
                    oder je Event die Datei unter der Liste.
                  </p>
                  <div className={eventGrid}>
                    {active.map((event) => (
                      <EventListingCardActive key={event.slug} event={event} />
                    ))}
                  </div>
                </>
              ) : (
                <p className={lede}>
                  Momentan sind keine kommenden Events eingetragen.
                </p>
              )}
            </section>

            {past.length > 0 ? (
              <section
                className={listingBlock}
                aria-labelledby="events-past-heading"
              >
                <h2 className={subsectionTitle} id="events-past-heading">
                  Vergangene Events
                </h2>
                <div className={eventGrid}>
                  {past.map((event) => (
                    <EventListingCardPast key={event.slug} event={event} />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}
      </Container>
    </main>
  );
}
