import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

import {
  REVALIDATE_TAGS,
  REVALIDATE_TAG_PROFILE,
} from "../../lib/cms/isr-config.ts";
import {
  pathsToRevalidateForTags,
  pathsWhenEventsCollectionChanged,
} from "../../lib/cms/paths-for-revalidate-tags.ts";

async function tag(profile: typeof REVALIDATE_TAG_PROFILE, tagName: string) {
  const { revalidateTag } = await import("next/cache");
  revalidateTag(tagName, profile);
}

async function revalidatePathsQuiet(paths: readonly string[]) {
  const { revalidatePath } = await import("next/cache");
  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch {
      /* Payload jobs sometimes run without App Router cache scope; tags still expire fetch cache */
    }
  }
}

function eventDocSlug(doc: unknown): string | undefined {
  if (doc && typeof doc === "object" && "slug" in doc) {
    const s = (doc as { slug?: unknown }).slug;
    if (typeof s === "string" && s.length > 0) return s;
  }
  return undefined;
}

async function tagAndPaths(tagName: string) {
  await tag(REVALIDATE_TAG_PROFILE, tagName);
  await revalidatePathsQuiet(pathsToRevalidateForTags([tagName]));
}

export const revalidateEvents: CollectionAfterChangeHook = async ({ doc }) => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.events);
  await revalidatePathsQuiet(
    pathsWhenEventsCollectionChanged(eventDocSlug(doc)),
  );
};

export const revalidateEventsDelete: CollectionAfterDeleteHook = async ({
  doc,
}) => {
  await tag(REVALIDATE_TAG_PROFILE, REVALIDATE_TAGS.events);
  await revalidatePathsQuiet(
    pathsWhenEventsCollectionChanged(eventDocSlug(doc)),
  );
};

export const revalidateGallery: CollectionAfterChangeHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.gallery);
};

export const revalidateGalleryDelete: CollectionAfterDeleteHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.gallery);
};

export const revalidateHomepage: GlobalAfterChangeHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.homepage);
};

export const revalidateNavigation: GlobalAfterChangeHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.navigation);
};

export const revalidateCommunityFaq: GlobalAfterChangeHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.communityFaq);
};

export const revalidateLegalImpressum: GlobalAfterChangeHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.legalImpressum);
};

export const revalidateLegalDatenschutz: GlobalAfterChangeHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.legalDatenschutz);
};

export const revalidateCookieBanner: GlobalAfterChangeHook = async () => {
  await tagAndPaths(REVALIDATE_TAGS.cookieBanner);
};
