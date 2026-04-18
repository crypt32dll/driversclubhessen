import { logger } from "@/lib/logger";
import { CMS_ISR_SECONDS, REVALIDATE_TAGS } from "@/lib/cms/isr-config";
import { getPayloadClient } from "@/lib/payload/get-payload";
import type {
  CookieBanner as PayloadCookieBanner,
  LegalDatenschutz,
  LegalImpressum,
} from "@/payload-types";
import { unstable_cache } from "next/cache";

const loadLegalImpressum = unstable_cache(
  async (): Promise<LegalImpressum | null> => {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "legal-impressum",
      depth: 0,
    });
    return doc as LegalImpressum | null;
  },
  ["cms-legal-impressum"],
  {
    tags: [REVALIDATE_TAGS.legalImpressum],
    revalidate: CMS_ISR_SECONDS,
  },
);

const loadLegalDatenschutz = unstable_cache(
  async (): Promise<LegalDatenschutz | null> => {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "legal-datenschutz",
      depth: 0,
    });
    return doc as LegalDatenschutz | null;
  },
  ["cms-legal-datenschutz"],
  {
    tags: [REVALIDATE_TAGS.legalDatenschutz],
    revalidate: CMS_ISR_SECONDS,
  },
);

const loadCookieBanner = unstable_cache(
  async (): Promise<PayloadCookieBanner | null> => {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "cookie-banner",
      depth: 0,
    });
    return doc as PayloadCookieBanner | null;
  },
  ["cms-cookie-banner"],
  {
    tags: [REVALIDATE_TAGS.cookieBanner],
    revalidate: CMS_ISR_SECONDS,
  },
);

export const gdprService = {
  async getLegalImpressum(): Promise<LegalImpressum | null> {
    try {
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
      const doc = await loadCookieBanner();
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
