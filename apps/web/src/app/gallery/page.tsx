import { Container } from "@/components/ui/Container";
import { galleryService } from "@/lib/services/gallery";
import Image from "next/image";

export const revalidate = 300;

export default async function GalleryPage() {
  const images = await galleryService.getGalleryItems().catch(() => []);

  return (
    <main>
      <Container>
        <h1>Gallery</h1>
        {images.length === 0 ? (
          <p>Keine Galerieinhalte verfuegbar.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "1rem",
            }}
          >
            {images.map((item) => (
              <figure key={item.documentId ?? item.title}>
                <Image
                  src={item.image.url}
                  alt={item.image.alternativeText ?? item.title}
                  width={item.image.width ?? 1200}
                  height={item.image.height ?? 800}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
