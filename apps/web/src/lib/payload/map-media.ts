import type { Media } from "@/payload-types";
import type { Event } from "@driversclub/shared";

type SharedImage = NonNullable<Event["images"]>[number];

/**
 * Public site origin for Payload media paths (`/api/media/file/...`).
 * Set `NEXT_PUBLIC_APP_URL` in production (e.g. `https://example.com`).
 */
export function getCmsMediaBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return vercel.startsWith("http")
      ? vercel.replace(/\/$/, "")
      : `https://${vercel}`;
  }

  return "http://localhost:3000";
}

export function getCmsMediaAbsoluteUrl(url?: string | null): string {
  if (url == null || url === "") return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = getCmsMediaBaseUrl();
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function mapPayloadMediaToImage(media: Media): SharedImage | null {
  const url = media.url;
  if (!url) return null;
  return {
    url: getCmsMediaAbsoluteUrl(url),
    alternativeText: media.alt ?? null,
    ...(typeof media.width === "number" ? { width: media.width } : {}),
    ...(typeof media.height === "number" ? { height: media.height } : {}),
  };
}
