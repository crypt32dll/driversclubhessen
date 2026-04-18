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
  return marketingMetadataForPath("/legal/datenschutz", {
    title: `Datenschutz | ${SITE_METADATA_DEFAULTS.title}`,
    description:
      "Datenschutzerklaerung und Informationen zur Datenverarbeitung bei DriversClub Hessen.",
  });
}

function DatenschutzFallback() {
  return (
    <p>
      Hier erscheint die Datenschutzerklaerung. Bitte Inhalt im Payload-Global
      &quot;Datenschutz&quot; pflegen.
    </p>
  );
}

export default async function DatenschutzPage() {
  const doc = await gdprService.getLegalDatenschutz();

  return (
    <main>
      <Container>
        <h1>{doc?.title ?? "Datenschutz"}</h1>
        {doc?.body ? (
          <LexicalRichText
            data={doc.body as unknown as SerializedEditorState}
          />
        ) : (
          <DatenschutzFallback />
        )}
      </Container>
    </main>
  );
}
