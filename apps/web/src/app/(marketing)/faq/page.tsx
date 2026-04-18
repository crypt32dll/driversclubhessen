import { LexicalRichText } from "@/components/cms/LexicalRichText";
import { CommunityFaqFallback } from "@/components/faq/CommunityFaqFallback";
import {
  main as faqMain,
  title as faqTitle,
} from "@/components/faq/FaqPage.css";
import { Container } from "@/components/ui/Container";
import {
  SITE_METADATA_DEFAULTS,
  marketingMetadataForPath,
} from "@/lib/metadata/marketing-page-metadata";
import {
  communityFaqService,
  hasLexicalBodyContent,
} from "@/lib/services/community-faq";
import type { SerializedEditorState } from "lexical";
import type { Metadata } from "next";

export const revalidate = 3600;

const DEFAULT_FAQ_DESCRIPTION =
  "Regeln, Gruppenstruktur und Partner von DriversClub Hessen — fairer Austausch rund ums Tuning.";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await communityFaqService.getCommunityFaq().catch(() => null);
  const description = doc?.metaDescription?.trim() || DEFAULT_FAQ_DESCRIPTION;
  const titleBase = doc?.title?.trim() || "FAQ & Community";
  return marketingMetadataForPath("/faq", {
    title: `${titleBase} | ${SITE_METADATA_DEFAULTS.title}`,
    description,
  });
}

export default async function FaqPage() {
  const doc = await communityFaqService.getCommunityFaq().catch(() => null);
  const title = doc?.title?.trim() || "FAQ & Community";
  const useCmsBody = doc?.body && hasLexicalBodyContent(doc.body);

  return (
    <Container>
      {useCmsBody ? (
        <main className={faqMain}>
          <h1 className={faqTitle}>{title}</h1>
          <LexicalRichText
            data={doc.body as unknown as SerializedEditorState}
          />
        </main>
      ) : (
        <CommunityFaqFallback />
      )}
    </Container>
  );
}
