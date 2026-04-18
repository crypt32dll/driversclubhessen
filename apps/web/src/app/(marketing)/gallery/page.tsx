import {
  galleryCaption,
  galleryFigure,
  galleryGrid,
  intro,
  kicker,
  lede,
  main,
  title,
} from "@/components/marketing/MarketingListPage.css";
import { Container } from "@/components/ui/Container";
import {
  SITE_METADATA_DEFAULTS,
  marketingMetadataForPath,
} from "@/lib/metadata/marketing-page-metadata";
import { galleryService } from "@/lib/services/gallery";
import type { Metadata } from "next";
import Image from "next/image";

/** ISR — literal required by Next.js 16 segment config; see marketing `page.tsx` comment. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadataForPath("/gallery", {
    title: `Galerie | ${SITE_METADATA_DEFAULTS.title}`,
    description:
      "Impressionen und Bilder aus der DriversClub Hessen Community — direkt aus dem CMS.",
  });
}

export default async function GalleryPage() {
  const images = await galleryService.getGalleryItems().catch(() => []);

  return (
    <main className={main}>
      <Container>
        <header className={intro}>
          <p className={kicker}>Galerie</p>
          <h1 className={title}>Impressionen</h1>
          <p className={lede}>
            Aktuelle Bilder aus der Community — neue Eintraege erscheinen hier
            automatisch aus dem CMS.
          </p>
        </header>
        {images.length === 0 ? (
          <p className={lede}>Keine Galerieinhalte verfuegbar.</p>
        ) : (
          <div className={galleryGrid}>
            {images.map((item) => (
              <figure
                key={item.documentId ?? item.title}
                className={galleryFigure}
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alternativeText ?? item.title}
                  width={item.image.width ?? 1200}
                  height={item.image.height ?? 800}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ width: "100%", height: "auto", borderRadius: "6px" }}
                />
                <figcaption className={galleryCaption}>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
