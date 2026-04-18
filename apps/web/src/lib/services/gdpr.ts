import { isCmsPreviewRequest } from "@/lib/cms/cms-draft";
import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { logger } from "@/lib/logger";
import { getPayloadClient } from "@/lib/payload/get-payload";
import type {
  LegalDatenschutz,
  LegalImpressum,
  CookieBanner as PayloadCookieBanner,
} from "@/payload-types";
import { unstable_cache } from "next/cache";

async function loadLegalImpressumFromPayload(
  draft: boolean,
): Promise<LegalImpressum | null> {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({
    slug: "legal-impressum",
    depth: 0,
    draft,
  });
  return doc as LegalImpressum | null;
}

const loadLegalImpressum = unstable_cache(
  async (): Promise<LegalImpressum | null> =>
    loadLegalImpressumFromPayload(false),
  ["cms-legal-impressum"],
  {
    tags: [REVALIDATE_TAGS.legalImpressum],
    revalidate: CMS_ISR_SECONDS,
  },
);

async function loadLegalDatenschutzFromPayload(
  draft: boolean,
): Promise<LegalDatenschutz | null> {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({
    slug: "legal-datenschutz",
    depth: 0,
    draft,
  });
  return doc as LegalDatenschutz | null;
}

const loadLegalDatenschutz = unstable_cache(
  async (): Promise<LegalDatenschutz | null> =>
    loadLegalDatenschutzFromPayload(false),
  ["cms-legal-datenschutz"],
  {
    tags: [REVALIDATE_TAGS.legalDatenschutz],
    revalidate: CMS_ISR_SECONDS,
  },
);

async function loadCookieBannerFromPayload(
  draft: boolean,
): Promise<PayloadCookieBanner | null> {
  const payload = await getPayloadClient();
  const doc = await payload.findGlobal({
    slug: "cookie-banner",
    depth: 0,
    draft,
  });
  return doc as PayloadCookieBanner | null;
}

const loadCookieBanner = unstable_cache(
  async (): Promise<PayloadCookieBanner | null> =>
    loadCookieBannerFromPayload(false),
  ["cms-cookie-banner"],
  {
    tags: [REVALIDATE_TAGS.cookieBanner],
    revalidate: CMS_ISR_SECONDS,
  },
);

export const gdprService = {
  async getLegalImpressum(): Promise<LegalImpressum | null> {
    try {
      if (await isCmsPreviewRequest()) {
        return await loadLegalImpressumFromPayload(true);
      }
      return await loadLegalImpressum();
    } catch (err) {
      logger.warn(
        "Payload legal-impressum unavailable.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return null;
    }
  },

  async getLegalDatenschutz(): Promise<LegalDatenschutz | null> {
    try {
      if (await isCmsPreviewRequest()) {
        return await loadLegalDatenschutzFromPayload(true);
      }
      return await loadLegalDatenschutz();
    } catch (err) {
      logger.warn(
        "Payload legal-datenschutz unavailable.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return null;
    }
  },

  async getCookieBanner(): Promise<{
    message: string;
    acceptLabel: string;
    rejectLabel: string;
  }> {
    const fallback = {
      message:
        "Wir verwenden nur technisch notwendige Cookies. Optionale Cookies werden erst nach deiner Einwilligung aktiviert.",
      acceptLabel: "Alle akzeptieren",
      rejectLabel: "Nur notwendige",
    };
    try {
      const doc = (await isCmsPreviewRequest())
        ? await loadCookieBannerFromPayload(true)
        : await loadCookieBanner();
      if (!doc?.message) return fallback;
      return {
        message: doc.message,
        acceptLabel: doc.acceptLabel?.trim() || fallback.acceptLabel,
        rejectLabel: doc.rejectLabel?.trim() || fallback.rejectLabel,
      };
    } catch (err) {
      logger.warn(
        "Payload cookie-banner unavailable.",
        err instanceof Error
          ? { name: err.name, message: err.message }
          : { err: String(err) },
      );
      return fallback;
    }
  },
};
