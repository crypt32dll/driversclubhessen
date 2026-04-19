import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatFeaturedEventTeaser } from "@/lib/format-featured-event-teaser";
import { buildEventInfoCardsFromEvent } from "@/lib/homepage/event-info-cards-from-event";
import type { Event, EventInfoCard } from "@driversclub/shared";
import Link from "next/link";
import {
  eventCard,
  eventCardIcon,
  eventCardSub,
  eventCardTitle,
  eventCardValue,
  eventGrid,
  eventSection,
  sectionLabel,
  sectionTitle,
  sectionTitleAccent,
} from "./sections.css";

const STATIC_EVENT_CARDS: readonly EventInfoCard[] = [
  {
    icon: "📅",
    title: "Datum",
    value: "19. April 2026",
    sub: "Sonntag",
  },
  {
    icon: "🕐",
    title: "Uhrzeit",
    value: "12:00 – 20:00",
    sub: "Beginn: 12 Uhr · Ende: 20 Uhr",
  },
  {
    icon: "📍",
    title: "Location",
    value: "Birstein",
    sub: "Industriestraße 6, 63633 Birstein",
  },
  {
    icon: "🎟️",
    title: "Eintritt",
    value: "Kostenlos",
    sub: "Eintritt frei – jeder ist willkommen!",
  },
];

type Props = {
  /** Next upcoming or hero-picked event; drives teaser + info cards on the homepage. */
  leadEvent: Event | null;
  sectionLabelText?: string;
  titleLead?: string;
  titleAccent?: string;
  /** Fallback when there is no `leadEvent` (e.g. no upcoming events) — marketing-only cards. */
  eventInfoCards?: readonly EventInfoCard[];
};

export function UpcomingEventsSection({
  leadEvent,
  sectionLabelText = "Das Event",
  titleLead = "Was dich ",
  titleAccent = "erwartet",
  eventInfoCards,
}: Props) {
  const hasCmsInfoCards = eventInfoCards != null && eventInfoCards.length > 0;

  const featuredEventText = leadEvent
    ? formatFeaturedEventTeaser(leadEvent)
    : undefined;

  const cardsSource = leadEvent
    ? buildEventInfoCardsFromEvent(leadEvent)
    : hasCmsInfoCards
      ? eventInfoCards
      : STATIC_EVENT_CARDS;

  return (
    <section className={eventSection} id="aktuell">
      <Container>
        <Reveal>
          <p className={sectionLabel}>{sectionLabelText}</p>
          <h2 className={sectionTitle}>
            {`${titleLead} `}
            <span className={sectionTitleAccent}>{titleAccent}</span>
          </h2>
          {featuredEventText ? (
            <p className={eventCardSub} style={{ marginTop: "0.75rem" }}>
              {featuredEventText}
            </p>
          ) : null}
        </Reveal>
        <div className={eventGrid}>
          {cardsSource.map((card, index) => (
            <Reveal
              key={`${card.title}-${card.value}-${index}`}
              className={eventCard}
            >
              <div className={eventCardIcon}>{card.icon}</div>
              <div className={eventCardTitle}>{card.title}</div>
              <div className={eventCardValue}>{card.value}</div>
              <div className={eventCardSub}>{card.sub}</div>
            </Reveal>
          ))}
        </div>
        {leadEvent ? (
          <Reveal>
            <p
              className={eventCardSub}
              style={{ marginTop: "1.25rem", textAlign: "center" }}
            >
              <Link href={`/events/${leadEvent.slug}`}>Details →</Link>
              {" · "}
              <Link href="/events">Alle Termine</Link>
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
