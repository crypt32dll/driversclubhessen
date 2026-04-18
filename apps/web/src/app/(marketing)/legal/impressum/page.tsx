import { LexicalRichText } from "@/components/cms/LexicalRichText";
import { Container } from "@/components/ui/Container";
import {
  SITE_METADATA_DEFAULTS,
  marketingMetadataForPath,
} from "@/lib/metadata/marketing-page-metadata";
import { gdprService } from "@/lib/services/gdpr";
import type { SerializedEditorState } from "lexical";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadataForPath("/legal/impressum", {
    title: `Impressum | ${SITE_METADATA_DEFAULTS.title}`,
    description:
      "Impressum und rechtliche Angaben zu DriversClub Hessen (Angaben gemaess TMG).",
  });
}

function ImpressumFallback() {
  return (
    <>
      <p>
        Angaben gemaess Abschnitt 5 TMG. Bitte die folgenden Platzhalter durch
        die tatsaechlichen Vereins-/Betreiberdaten ersetzen.
      </p>
      <p>DriversClub Hessen</p>
      <p>Strasse und Hausnummer</p>
      <p>PLZ Ort, Deutschland</p>
      <p>E-Mail: kontakt@example.com</p>
    </>
  );
}

export default async function ImpressumPage() {
  const doc = await gdprService.getLegalImpressum();

  return (
    <main>
      <Container>
        <h1>{doc?.title ?? "Impressum"}</h1>
        {doc?.body ? (
          <LexicalRichText
            data={doc.body as unknown as SerializedEditorState}
          />
        ) : (
          <ImpressumFallback />
        )}
      </Container>
    </main>
  );
}
