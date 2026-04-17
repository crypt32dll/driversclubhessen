import { Container } from "@/components/ui/Container";
import { eventService } from "@/lib/services/events";
import Link from "next/link";

/** Strapi-backed; skip SSG so `next build` never blocks on CMS/network (e.g. Vercel). */
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await eventService.getUpcomingEvents().catch(() => []);

  return (
    <main>
      <Container>
        <h1>Events</h1>
        {events.length === 0 ? (
          <p>Aktuell sind keine Events verfuegbar.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.slug}>
                <h2>{event.title}</h2>
                <p>{new Date(event.date).toLocaleString("de-DE")}</p>
                <p>{event.location}</p>
                <Link href={`/events/${event.slug}`}>Zum Event</Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
