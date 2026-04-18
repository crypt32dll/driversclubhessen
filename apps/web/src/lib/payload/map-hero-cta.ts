import type { Event as PayloadEvent } from "@/payload-types";
import type { HeroCta } from "@driversclub/shared";

function nonEmptyString(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s.length > 0 ? s : undefined;
}

function parseVariant(v: unknown): "primary" | "outline" | undefined {
  if (v === "outline") return "outline";
  if (v === "primary") return "primary";
  return undefined;
}

function isAbsoluteOrMailHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

/**
 * Maps a Payload CTA row (homepage hero block or Event `homepageHero.ctas`) to a normalized `HeroCta`.
 * Supports `linkMode` + `eventReference` | `externalUrl`, plus legacy `href`-only rows.
 */
export function mapPayloadCtaRow(row: unknown): HeroCta | null {
  if (!row || typeof row !== "object") return null;
  const r = row as Record<string, unknown>;
  const label = nonEmptyString(r.label);
  if (!label) return null;
  const variant = parseVariant(r.variant);

  const linkModeRaw = r.linkMode;
  const isExternalMode = linkModeRaw === "external";

  if (isExternalMode) {
    const url = nonEmptyString(r.externalUrl);
    if (!url) return null;
    return { label, href: url, variant, openInNewTab: true };
  }

  const ref = r.eventReference;
  if (ref != null && typeof ref === "object" && "slug" in ref) {
    const slug = nonEmptyString((ref as PayloadEvent).slug);
    if (!slug) return null;
    return { label, href: `/events/${slug}`, variant, openInNewTab: false };
  }

  const legacyHref = nonEmptyString(r.href);
  if (legacyHref) {
    return {
      label,
      href: legacyHref,
      variant,
      openInNewTab: isAbsoluteOrMailHref(legacyHref),
    };
  }

  return null;
}

export function mapPayloadCtaRows(raw: unknown): HeroCta[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: HeroCta[] = [];
  for (const row of raw) {
    const c = mapPayloadCtaRow(row);
    if (c) out.push(c);
  }
  return out.length ? out : undefined;
}
