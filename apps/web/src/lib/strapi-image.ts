/**
 * Strapi returns relative media URLs like `/uploads/...`.
 * Next `next/image` and browsers need an absolute URL when the app runs on another origin.
 */
export function getStrapiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  return base.replace(/\/$/, "");
}

export function getStrapiImage(url?: string | null): string {
  if (url == null || url === "") return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${getStrapiBaseUrl()}${url.startsWith("/") ? "" : "/"}${url}`;
}
