import type { Event } from "@driversclub/shared";

import { getStrapiImage } from "@/lib/strapi-image";

type StrapiImage = NonNullable<Event["images"]>[number];

export function unwrapStrapiRelationData<T>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[];
  if (val && typeof val === "object" && "data" in val) {
    const d = (val as { data: unknown }).data;
    if (Array.isArray(d)) return d as T[];
    if (d && typeof d === "object") return [d as T];
    if (d === null) return [];
  }
  return [];
}

function pickUrl(entry: Record<string, unknown>): string | undefined {
  const attrs = entry.attributes as Record<string, unknown> | undefined;
  const fromRoot = entry.url;
  const fromAttrs = attrs?.url;
  if (typeof fromRoot === "string") return fromRoot;
  if (typeof fromAttrs === "string") return fromAttrs;
  return undefined;
}

function pickAlt(entry: Record<string, unknown>): string | null | undefined {
  const attrs = entry.attributes as Record<string, unknown> | undefined;
  const fromRoot = entry.alternativeText;
  const fromAttrs = attrs?.alternativeText;
  if (typeof fromRoot === "string") return fromRoot;
  if (fromRoot === null) return null;
  if (typeof fromAttrs === "string") return fromAttrs;
  if (fromAttrs === null) return null;
  return undefined;
}

function pickDimensions(entry: Record<string, unknown>): {
  width?: number;
  height?: number;
} {
  const attrs = entry.attributes as Record<string, unknown> | undefined;
  const w =
    typeof entry.width === "number"
      ? entry.width
      : typeof attrs?.width === "number"
        ? attrs.width
        : undefined;
  const h =
    typeof entry.height === "number"
      ? entry.height
      : typeof attrs?.height === "number"
        ? attrs.height
        : undefined;
  return { width: w, height: h };
}

export function mapStrapiMediaToImage(
  entry: Record<string, unknown>,
): StrapiImage | null {
  const url = pickUrl(entry);
  if (!url) return null;
  const { width, height } = pickDimensions(entry);
  return {
    url: getStrapiImage(url),
    alternativeText: pickAlt(entry) ?? null,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };
}
