import { EventDescription } from "@/components/strapi/EventDescription";
import { Container } from "@/components/ui/Container";
import { eventService } from "@/lib/services/events";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await eventService.getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <Container>
        <h1>{event.title}</h1>
        <p>{new Date(event.date).toLocaleString("de-DE")}</p>
        <p>{event.location}</p>
        {event.images?.[0] ? (
          <p style={{ marginTop: "1rem" }}>
            <Image
              src={event.images[0].url}
              alt={event.images[0].alternativeText ?? event.title}
              width={event.images[0].width ?? 1200}
              height={event.images[0].height ?? 800}
              style={{ width: "100%", height: "auto" }}
            />
          </p>
        ) : null}
        <article style={{ marginTop: "1.5rem" }}>
          <EventDescription description={event.description} />
        </article>
      </Container>
    </main>
  );
}
