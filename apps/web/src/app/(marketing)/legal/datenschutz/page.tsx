import { LexicalRichText } from "@/components/cms/LexicalRichText";
import { Container } from "@/components/ui/Container";
import { gdprService } from "@/lib/services/gdpr";
import type { SerializedEditorState } from "lexical";

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
          <LexicalRichText data={doc.body as unknown as SerializedEditorState} />
        ) : (
          <DatenschutzFallback />
        )}
      </Container>
    </main>
  );
}
