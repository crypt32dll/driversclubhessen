import type { Event } from "@driversclub/shared";
import type { Metadata } from "next";

import { getCmsMediaBaseUrl } from "@/lib/payload/map-media";

import { SITE_METADATA_DEFAULTS } from "@/lib/metadata/site-defaults";

const OG_LOCALE = "de_DE";

/** First hero background, else first gallery image — URLs are already absolute from Payload mapping. */
export function pickEventShareImageUrl(
  event: Event | null | undefined,
): string | undefined {
  if (!event) return undefined;
  const hero = event.heroBackgroundImage?.url;
  if (hero) return hero;
  return event.images?.[0]?.url;
}

function defaultOgImageUrl(): string {
  return `${getCmsMediaBaseUrl()}/opengraph-image`;
}

export function ogTwitterForRoute(
  pathname: string,
  title: string,
  description: string,
  options?: { shareImageUrl?: string },
): Pick<Metadata, "openGraph" | "twitter"> {
  const shareImageUrl = options?.shareImageUrl ?? defaultOgImageUrl();
  const images = [{ url: shareImageUrl }];

  return {
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: SITE_METADATA_DEFAULTS.title,
      type: "website",
      locale: OG_LOCALE,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
