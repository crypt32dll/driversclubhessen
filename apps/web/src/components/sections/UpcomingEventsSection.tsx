import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { eventService } from "@/lib/services/events";
import { excerptFromEventDescription } from "@/lib/strapi/excerpt";
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

const STATIC_EVENT_CARDS = [
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
] as const;

export const UpcomingEventsSection = async () => {
  const events = await eventService.getUpcomingEvents().catch(() => []);

  return (
    <section className={eventSection} id="event">
      <Container>
        <Reveal>
          <p className={sectionLabel}>Das Event</p>
          <h2 className={sectionTitle}>
            Was dich <span className={sectionTitleAccent}>erwartet</span>
          </h2>
        </Reveal>
        <div className={eventGrid}>
          {events.length === 0
            ? STATIC_EVENT_CARDS.map((card) => (
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
                  <p className={eventCardSub}>
                    {excerptFromEventDescription(event.description)}
                  </p>
                  <Link href={`/events/${event.slug}`}>Details →</Link>
                </Reveal>
              ))}
        </div>
      </Container>
    </section>
  );
};
