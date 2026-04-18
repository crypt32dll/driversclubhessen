import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import type { Page } from "@/payload-types";
import { unstable_cache } from "next/cache";

export type PageSeoRow = Pick<Page, "slug" | "metaTitle" | "metaDescription">;

function fetchPageBySlug(slug: string): Promise<Page | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "pages",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      const doc = res.docs[0];
      return doc ?? null;
    },
    ["cms-page", slug],
    {
      tags: [REVALIDATE_TAGS.pages],
      revalidate: CMS_ISR_SECONDS,
    },
  )();
}

export const pagesService = {
  async getPageSeoBySlug(slug: string): Promise<PageSeoRow | null> {
    try {
      const doc = await fetchPageBySlug(slug);
      if (!doc) return null;
      return {
        slug: doc.slug,
        metaTitle: doc.metaTitle,
        metaDescription: doc.metaDescription,
      };
    } catch (err) {
      logger.warn(
        "Payload pages SEO lookup failed.",
        err instanceof Error
          ? { name: err.name, message: err.message, slug }
          : { err: String(err), slug },
      );
      return null;
    }
  },
};
