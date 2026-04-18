import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

import {
  REVALIDATE_TAG_PROFILE,
  REVALIDATE_TAGS,
} from "../../lib/cms/isr-config.ts";

async function tag(profile: typeof REVALIDATE_TAG_PROFILE, tagName: string) {
  const { revalidateTag } = await import("next/cache");
  revalidateTag(tagName, profile);
}

export const revalidateEvents: CollectionAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.events);
};

export const revalidateEventsDelete: CollectionAfterDeleteHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.events);
};

export const revalidatePages: CollectionAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.pages);
};

export const revalidatePagesDelete: CollectionAfterDeleteHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.pages);
};

export const revalidateGallery: CollectionAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.gallery);
};

export const revalidateGalleryDelete: CollectionAfterDeleteHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.gallery);
};

export const revalidateHomepage: GlobalAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.homepage);
};

export const revalidateNavigation: GlobalAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.navigation);
};

export const revalidateLegalImpressum: GlobalAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.legalImpressum);
};

export const revalidateLegalDatenschutz: GlobalAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.legalDatenschutz);
};

export const revalidateCookieBanner: GlobalAfterChangeHook = async () => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.cookieBanner);
};
