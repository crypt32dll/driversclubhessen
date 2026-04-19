import type { Media, Event as PayloadEvent } from "@/payload-types";
import type { Event } from "@driversclub/shared";

import { mapPayloadCtaRows } from "@/lib/payload/map-hero-cta";
import { mapPayloadMediaToImage } from "@/lib/payload/map-media";

function nonEmptyString(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s.length > 0 ? s : undefined;
}

function normalizeImages(
  raw: PayloadEvent["images"],
): Event["images"] | undefined {
  if (!raw?.length) return undefined;
  const out: NonNullable<Event["images"]> = [];
  for (const item of raw) {
    if (typeof item === "number") continue;
    const img = mapPayloadMediaToImage(item as Media);
    if (img) out.push(img);
  }
  return out.length ? out : undefined;
}

function normalizeFaq(raw: PayloadEvent["faq"]): Event["faq"] | undefined {
  if (!raw?.length) return undefined;
  const out: NonNullable<Event["faq"]> = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const question =
      typeof row.question === "string" ? row.question.trim() : "";
    const answer = typeof row.answer === "string" ? row.answer.trim() : "";
    if (question.length > 0 && answer.length > 0) {
      out.push({ question, answer });
    }
  }
  return out.length ? out : undefined;
}

function normalizeBringList(
  raw: PayloadEvent["bringList"],
): Event["bringList"] | undefined {
  if (!raw?.length) return undefined;
  const out: NonNullable<Event["bringList"]> = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const item = typeof row.item === "string" ? row.item.trim() : "";
    if (item.length > 0) out.push({ item });
  }
  return out.length ? out : undefined;
}

const EVENT_STATUSES = new Set([
  "planned",
  "confirmed",
  "sold_out",
  "cancelled",
]);

function normalizeStatus(raw: PayloadEvent["status"]): Event["status"] {
  if (typeof raw === "string" && EVENT_STATUSES.has(raw)) {
    return raw as NonNullable<Event["status"]>;
  }
  return "planned";
}

export function mapPayloadEvent(doc: PayloadEvent): Event {
  const dateRaw = doc.date;
  const date =
    typeof dateRaw === "string" && dateRaw.length > 0
      ? dateRaw
      : new Date(dateRaw as string | number | Date).toISOString();

  const h = doc.homepageHero;
  let heroBackgroundImage: Event["heroBackgroundImage"];
  let heroCtas: ReturnType<typeof mapPayloadCtaRows> | undefined;

  if (h && typeof h === "object") {
    const bg = h.backgroundImage;
    if (bg != null && typeof bg === "object" && "url" in bg) {
      const img = mapPayloadMediaToImage(bg as Media);
      if (img) heroBackgroundImage = img;
    }
    heroCtas = mapPayloadCtaRows(h.ctas);
  }

  const status = normalizeStatus(doc.status);
  const faq = normalizeFaq(doc.faq);
  const bringList = normalizeBringList(doc.bringList);

  return {
    id: typeof doc.id === "number" ? doc.id : undefined,
    slug: doc.slug,
    title: doc.title,
    status,
    ...(nonEmptyString(doc.metaTitle)
      ? { metaTitle: nonEmptyString(doc.metaTitle) }
      : {}),
    ...(nonEmptyString(doc.metaDescription)
      ? { metaDescription: nonEmptyString(doc.metaDescription) }
      : {}),
    date,
    location: doc.location,
    ...(nonEmptyString(doc.address)
      ? { address: nonEmptyString(doc.address) }
      : {}),
    ...(nonEmptyString(doc.admissionNote)
      ? { admissionNote: nonEmptyString(doc.admissionNote) }
      : {}),
    ...(nonEmptyString(doc.mapsUrl)
      ? { mapsUrl: nonEmptyString(doc.mapsUrl) }
      : {}),
    ...(nonEmptyString(doc.homeEventSectionLabel)
      ? { homeEventSectionLabel: nonEmptyString(doc.homeEventSectionLabel) }
      : {}),
    ...(nonEmptyString(doc.homeEventTitleLead)
      ? { homeEventTitleLead: nonEmptyString(doc.homeEventTitleLead) }
      : {}),
    ...(nonEmptyString(doc.homeEventTitleAccent)
      ? { homeEventTitleAccent: nonEmptyString(doc.homeEventTitleAccent) }
      : {}),
    ...(nonEmptyString(doc.homeLocationSectionLabel)
      ? {
          homeLocationSectionLabel: nonEmptyString(
            doc.homeLocationSectionLabel,
          ),
        }
      : {}),
    ...(nonEmptyString(doc.homeLocationTitleLead)
      ? { homeLocationTitleLead: nonEmptyString(doc.homeLocationTitleLead) }
      : {}),
    ...(nonEmptyString(doc.homeLocationTitleAccent)
      ? { homeLocationTitleAccent: nonEmptyString(doc.homeLocationTitleAccent) }
      : {}),
    ...(nonEmptyString(doc.homeAboutSectionLabel)
      ? { homeAboutSectionLabel: nonEmptyString(doc.homeAboutSectionLabel) }
      : {}),
    ...(nonEmptyString(doc.homeAboutTitleLead)
      ? { homeAboutTitleLead: nonEmptyString(doc.homeAboutTitleLead) }
      : {}),
    ...(nonEmptyString(doc.homeAboutTitleAccent)
      ? { homeAboutTitleAccent: nonEmptyString(doc.homeAboutTitleAccent) }
      : {}),
    ...(nonEmptyString(doc.collabPartnerBadge)
      ? { collabPartnerBadge: nonEmptyString(doc.collabPartnerBadge) }
      : {}),
    ...(nonEmptyString(doc.collabPartnerName)
      ? { collabPartnerName: nonEmptyString(doc.collabPartnerName) }
      : {}),
    ...(nonEmptyString(doc.collabAboutBody)
      ? { collabAboutBody: nonEmptyString(doc.collabAboutBody) }
      : {}),
    createdAt: doc.createdAt,
    images: normalizeImages(doc.images),
    ...(faq ? { faq } : {}),
    ...(bringList ? { bringList } : {}),
    ...(h && typeof h === "object"
      ? {
          ...(nonEmptyString(h.eyebrow)
            ? { heroEyebrow: nonEmptyString(h.eyebrow) }
            : {}),
          ...(nonEmptyString(h.titleLine1)
            ? { heroTitleLine1: nonEmptyString(h.titleLine1) }
            : {}),
          ...(nonEmptyString(h.titleLine2)
            ? { heroTitleLine2: nonEmptyString(h.titleLine2) }
            : {}),
          ...(nonEmptyString(h.badge)
            ? { heroBadge: nonEmptyString(h.badge) }
            : {}),
          ...(nonEmptyString(h.tagline)
            ? { heroTagline: nonEmptyString(h.tagline) }
            : {}),
        }
      : {}),
    ...(heroCtas ? { heroCtas } : {}),
    ...(heroBackgroundImage ? { heroBackgroundImage } : {}),
  };
}
