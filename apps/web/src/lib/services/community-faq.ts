import { isCmsPreviewRequest } from "@/lib/cms/cms-draft";
import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import type { CommunityFaq as CommunityFaqDoc } from "@/payload-types";
import { unstable_cache } from "next/cache";

async function loadCommunityFaqFromPayload(
  draft: boolean,
): Promise<CommunityFaqDoc | null> {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({
    slug: "community-faq",
    depth: 0,
    draft,
  });
  return doc as CommunityFaqDoc | null;
}

const loadCommunityFaq = unstable_cache(
  async (): Promise<CommunityFaqDoc | null> =>
    loadCommunityFaqFromPayload(false),
  ["cms-community-faq"],
  {
    tags: [REVALIDATE_TAGS.communityFaq],
    revalidate: CMS_ISR_SECONDS,
  },
);

export function hasLexicalBodyContent(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const root = (body as { root?: { children?: unknown[] } }).root;
  return Array.isArray(root?.children) && root.children.length > 0;
}

export const communityFaqService = {
  async getCommunityFaq(): Promise<CommunityFaqDoc | null> {
    try {
      if (await isCmsPreviewRequest()) {
        return await loadCommunityFaqFromPayload(true);
      }
      return await loadCommunityFaq();
    } catch (err) {
      logger.warn(
        "Payload community-faq unavailable.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return null;
    }
  },
};
