import type { RootLivePreviewConfig } from "payload";

/**
 * Relative URL so Payload resolves it against the current admin host (works on Vercel previews).
 * Opens draft mode, then redirects to the marketing route being edited.
 */
function previewEntryPath(redirect: string): string | null {
  const secret = process.env.PAYLOAD_PREVIEW_SECRET?.trim();
  if (!secret || secret.length < 16) return null;

  const safeRedirect = redirect.startsWith("/") ? redirect : "/";
  const qs = new URLSearchParams({
    secret,
    redirect: safeRedirect,
  });
  return `/api/draft?${qs.toString()}`;
}

const redirectForCollection: Record<
  string,
  (data: Record<string, unknown>) => string | null
> = {
  events: (data) => {
    const slug = typeof data.slug === "string" ? data.slug : null;
    if (!slug) return null;
    return `/events/${encodeURIComponent(slug)}`;
  },
  galleries: () => "/gallery",
};

const redirectForGlobal: Record<string, () => string> = {
  homepage: () => "/",
  navigation: () => "/",
  "legal-impressum": () => "/legal/impressum",
  "legal-datenschutz": () => "/legal/datenschutz",
  "cookie-banner": () => "/",
};

export const livePreviewConfig: RootLivePreviewConfig = {
  breakpoints: [{ label: "Mobile", name: "mobile", width: 390, height: 844 }],
  collections: ["events", "galleries"],
  globals: [
    "homepage",
    "navigation",
    "legal-impressum",
    "legal-datenschutz",
    "cookie-banner",
  ],
  url: ({ data, collectionConfig, globalConfig }) => {
    const d =
      data && typeof data === "object" ? (data as Record<string, unknown>) : {};

    if (collectionConfig?.slug) {
      const fn = redirectForCollection[collectionConfig.slug];
      const path = fn?.(d);
      if (!path) return null;
      return previewEntryPath(path);
    }

    if (globalConfig?.slug) {
      const path = redirectForGlobal[globalConfig.slug]?.();
      if (!path) return null;
      return previewEntryPath(path);
    }

    return null;
  },
};
