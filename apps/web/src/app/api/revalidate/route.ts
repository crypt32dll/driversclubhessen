import {
  CMS_ISR_SECONDS,
  REVALIDATE_TAGS,
  REVALIDATE_TAG_PROFILE,
} from "@/lib/cms/isr-config";
import { pathsToRevalidateForTags } from "@/lib/cms/paths-for-revalidate-tags";
import { logger } from "@/lib/logger";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type LegacyWebhookBody = {
  event?: string;
  model?: string;
  entry?: { slug?: string };
};

function getBearer(request: Request): string | undefined {
  const h = request.headers.get("authorization");
  if (!h?.toLowerCase().startsWith("bearer ")) return undefined;
  return h.slice(7).trim();
}

/**
 * On-demand revalidation for Payload → Vercel.
 *
 * **Auth:** `Authorization: Bearer <REVALIDATE_SECRET>` (recommended), or `{ "secret": "..." }` in JSON.
 *
 * **Manual:** `POST { "secret": "...", "tags": ["cms:homepage", "cms:events"] }`
 *
 * **Legacy Strapi-shaped webhook:** POST JSON with `event`, `model`, `entry` — mapped to CMS tags + paths.
 */
export async function POST(request: Request) {
  const configuredSecret =
    process.env.REVALIDATE_SECRET ?? process.env.STRAPI_REVALIDATE_SECRET;
  if (!configuredSecret) {
    logger.warn("Revalidate API: REVALIDATE_SECRET not set");
    return NextResponse.json(
      { revalidated: false, message: "Revalidation not configured" },
      { status: 501 },
    );
  }

  const raw = await request.text();
  let body: Record<string, unknown> & LegacyWebhookBody = {};
  if (raw.length > 0) {
    try {
      body = JSON.parse(raw) as Record<string, unknown> & LegacyWebhookBody;
    } catch {
      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }
  }

  const token =
    getBearer(request) ??
    (typeof body.secret === "string" ? body.secret : undefined);
  if (token !== configuredSecret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tagsInput = body.tags;
  if (Array.isArray(tagsInput) && tagsInput.length > 0) {
    const tags = tagsInput.filter((t): t is string => typeof t === "string");
    for (const tag of tags) {
      revalidateTag(tag, REVALIDATE_TAG_PROFILE);
    }
    /** Tag-only requests used to skip paths — ISR pages then kept stale HTML until time-based revalidate. */
    const pathsForTags = pathsToRevalidateForTags(tags);
    for (const path of pathsForTags) {
      revalidatePath(path);
    }
    logger.info("Revalidate: tags", { tags, paths: pathsForTags });
    return NextResponse.json({ revalidated: true, tags, paths: pathsForTags });
  }

  const event = body.event;
  const modelRaw = body.model;
  const entry = body.entry;

  const tags: string[] = [];
  const paths: string[] = [];

  const model =
    typeof modelRaw === "string"
      ? modelRaw.includes("::")
        ? (modelRaw.split("::").pop()?.split(".").shift() ?? modelRaw)
        : modelRaw
      : "";

  if (typeof event === "string" && event.startsWith("media.")) {
    tags.push(
      REVALIDATE_TAGS.homepage,
      REVALIDATE_TAGS.events,
      REVALIDATE_TAGS.gallery,
    );
    paths.push("/", "/events", "/gallery");
  } else if (model === "homepage") {
    tags.push(REVALIDATE_TAGS.homepage);
    paths.push("/", "/events", "/gallery");
  } else if (model === "community-faq") {
    tags.push(REVALIDATE_TAGS.communityFaq);
    paths.push("/faq");
  } else if (model === "legal-impressum") {
    tags.push(REVALIDATE_TAGS.legalImpressum);
    paths.push("/legal/impressum");
  } else if (model === "legal-datenschutz") {
    tags.push(REVALIDATE_TAGS.legalDatenschutz);
    paths.push("/legal/datenschutz");
  } else if (model === "cookie-banner") {
    tags.push(REVALIDATE_TAGS.cookieBanner);
    paths.push("/", "/faq", "/legal/impressum", "/legal/datenschutz");
  } else if (model === "navigation") {
    tags.push(REVALIDATE_TAGS.navigation);
    paths.push(
      "/",
      "/events",
      "/gallery",
      "/faq",
      "/legal/impressum",
      "/legal/datenschutz",
    );
  } else if (model === "event") {
    tags.push(REVALIDATE_TAGS.events);
    paths.push("/", "/events");
    if (entry?.slug) {
      paths.push(`/events/${entry.slug}`);
    }
  } else if (model === "gallery") {
    tags.push(REVALIDATE_TAGS.gallery);
    paths.push("/gallery");
  } else if (model) {
    return NextResponse.json(
      {
        message: `Unknown model "${model}". Use manual "tags" or model: homepage | navigation | community-faq | event | gallery | legal-impressum | legal-datenschutz | cookie-banner.`,
        supportedTags: Object.values(REVALIDATE_TAGS),
      },
      { status: 400 },
    );
  } else {
    return NextResponse.json(
      {
        message:
          'Provide "tags": ["cms:homepage", ...] or a webhook body with "model".',
        hint: `Example: { \"secret\": \"…\", \"tags\": [\"${REVALIDATE_TAGS.homepage}\"] }`,
      },
      { status: 400 },
    );
  }

  const uniquePaths = [...new Set(paths)];
  for (const tag of tags) {
    revalidateTag(tag, REVALIDATE_TAG_PROFILE);
  }
  for (const path of uniquePaths) {
    revalidatePath(path);
  }

  logger.info("Revalidate: webhook", {
    event,
    model,
    tags,
    paths: uniquePaths,
  });
  return NextResponse.json({
    revalidated: true,
    tags,
    paths: uniquePaths,
    fallbackSeconds: CMS_ISR_SECONDS,
  });
}
