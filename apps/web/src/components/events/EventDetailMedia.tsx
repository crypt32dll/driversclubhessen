import type { Event } from "@driversclub/shared";
import Image from "next/image";

import { Container } from "@/components/ui/Container";

import {
  mediaCaption,
  mediaFigure,
  mediaGrid,
  mediaHeader,
  mediaKicker,
  mediaLede,
  mediaSection,
  mediaTitle,
} from "./EventDetailPage.css";

type Props = {
  event: Event;
};

function galleryImagesFor(event: Event) {
  const images = event.images ?? [];
  if (images.length === 0) return [];
  const heroUsesFirstAsBgFallback =
    !event.heroBackgroundImage && images.length > 0;
  if (heroUsesFirstAsBgFallback && images.length > 1) {
    return images.slice(1);
  }
  return images;
}

export function EventDetailMedia({ event }: Props) {
  const images = galleryImagesFor(event);
  if (images.length === 0) {
    return null;
  }

  return (
    <section className={mediaSection} aria-labelledby="event-media-heading">
      <Container>
        <header className={mediaHeader}>
          <p className={mediaKicker}>Impressionen</p>
          <h2 className={mediaTitle} id="event-media-heading">
            Eindrücke &amp; Stimmung
          </h2>
          <p className={mediaLede}>
            Ausgewählte Medien aus dem CMS — zentriert und in Kartenrahmen wie
            auf der Event-Übersicht.
          </p>
        </header>
        <div className={mediaGrid}>
          {images.map((img, i) => (
            <figure key={`${img.url}-${i}`} className={mediaFigure}>
              <Image
                src={img.url}
                alt={img.alternativeText ?? `${event.title} — Bild ${i + 1}`}
                width={img.width ?? 1200}
                height={img.height ?? 800}
                sizes="(max-width: 720px) 100vw, 50vw"
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "low"}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {img.alternativeText ? (
                <figcaption className={mediaCaption}>
                  {img.alternativeText}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
