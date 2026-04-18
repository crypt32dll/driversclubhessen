import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
  /** Optional line from CMS (linked featured event on homepage). */
  featuredEventText?: string;
  /** Prefetched in the page to parallelize with homepage (avoids RSC waterfalls). */
  events: Event[];
  sectionLabelText?: string;
  titleLead?: string;
  titleAccent?: string;
  /** Shown when there are no events from Payload; otherwise optional detail cards. */
  eventInfoCards?: readonly EventInfoCard[];
};

export function UpcomingEventsSection({
  featuredEventText,
  events,
  sectionLabelText = "Das Event",
  titleLead = "Was dich ",
  titleAccent = "erwartet",
  eventInfoCards,
}: Props) {
  const cardsSource =
    events.length === 0
      ? eventInfoCards && eventInfoCards.length > 0
        ? eventInfoCards
        : STATIC_EVENT_CARDS
      : null;

  return (
    <section className={eventSection} id="event">
      <Container>
        <Reveal>
          <p className={sectionLabel}>{sectionLabelText}</p>
          <h2 className={sectionTitle}>
            {titleLead}
            <span className={sectionTitleAccent}>{titleAccent}</span>
          </h2>
          {featuredEventText ? (
            <p className={eventCardSub} style={{ marginTop: "0.75rem" }}>
              {featuredEventText}
            </p>
          ) : null}
        </Reveal>
        <div className={eventGrid}>
          {cardsSource
            ? cardsSource.map((card) => (
                <Reveal key={card.title} className={eventCard}>
                  <div className={eventCardIcon}>{card.icon}</div>
                  <div className={eventCardTitle}>{card.title}</div>
                  <div className={eventCardValue}>{card.value}</div>
                  <div className={eventCardSub}>{card.sub}</div>
                </Reveal>
              ))
            : events.map((event) => (
                <Reveal key={event.slug} className={eventCard}>
                  <div className={eventCardIcon}>📅</div>
                  <div className={eventCardTitle}>{event.title}</div>
                  <div className={eventCardValue}>
                    {new Date(event.date).toLocaleString("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className={eventCardSub}>{event.location}</div>
                  <Link href={`/events/${event.slug}`}>Details →</Link>
                </Reveal>
              ))}
        </div>
      </Container>
    </section>
  );
}
