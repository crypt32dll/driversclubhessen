import type { Media, Event as PayloadEvent } from "@/payload-types";
import type { Event, HeroCta } from "@driversclub/shared";

import { mapPayloadMediaToImage } from "@/lib/payload/map-media";

function nonEmptyString(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s.length > 0 ? s : undefined;
}

function isoFromPayloadDate(v: unknown): string | undefined {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string" && v.length > 0) return v;
  return undefined;
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

function mapHeroCtas(raw: unknown): HeroCta[] | undefined {
  type Row = {
    label?: string | null;
    href?: string | null;
    variant?: string | null;
  };
  if (!Array.isArray(raw)) return undefined;
  const out: HeroCta[] = [];
  for (const row of raw as Row[]) {
    if (!row) continue;
    const label = nonEmptyString(row.label);
    const href = nonEmptyString(row.href);
    if (!label || !href) continue;
    const v = row.variant;
    const variant =
      v === "outline"
        ? ("outline" as const)
        : v === "primary"
          ? ("primary" as const)
          : undefined;
    out.push({ label, href, variant });
  }
  return out.length ? out : undefined;
}

export function mapPayloadEvent(doc: PayloadEvent): Event {
  const dateRaw = doc.date;
  const date =
    typeof dateRaw === "string" && dateRaw.length > 0
      ? dateRaw
      : new Date(dateRaw as string | number | Date).toISOString();

  const h = doc.homepageHero;
  let heroCountdownEnd: string | undefined;
  let heroBackgroundImage: Event["heroBackgroundImage"];
  let heroCtas: HeroCta[] | undefined;

  if (h && typeof h === "object") {
    heroCountdownEnd = isoFromPayloadDate(h.countdownEnd);
    const bg = h.backgroundImage;
    if (bg != null && typeof bg === "object" && "url" in bg) {
      const img = mapPayloadMediaToImage(bg as Media);
      if (img) heroBackgroundImage = img;
    }
    heroCtas = mapHeroCtas(h.ctas);
  }

  return {
    id: typeof doc.id === "number" ? doc.id : undefined,
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    date,
    location: doc.location,
    createdAt: doc.createdAt,
    images: normalizeImages(doc.images),
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
          ...(nonEmptyString(h.dateLabel)
            ? { heroDateLabel: nonEmptyString(h.dateLabel) }
            : {}),
          ...(nonEmptyString(h.badge)
            ? { heroBadge: nonEmptyString(h.badge) }
            : {}),
          ...(nonEmptyString(h.tagline)
            ? { heroTagline: nonEmptyString(h.tagline) }
            : {}),
        }
      : {}),
    ...(heroCountdownEnd ? { heroCountdownEnd } : {}),
    ...(heroCtas ? { heroCtas } : {}),
    ...(heroBackgroundImage ? { heroBackgroundImage } : {}),
  };
}
