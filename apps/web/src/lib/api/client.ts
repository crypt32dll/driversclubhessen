import { logger } from "@/lib/logger";
import { STRAPI_ISR_SECONDS } from "@/lib/strapi/isr-config";

type QueryValue = string | number | boolean | undefined;

type StrapiFetchCache = {
  /** Next.js Data Cache tags (on-demand revalidation via `/api/revalidate`). */
  tags?: string[];
  /** Time-based fallback (seconds). Defaults to `STRAPI_ISR_REVALIDATE_SECONDS` / `STRAPI_ISR_SECONDS`. */
  revalidate?: number;
};

/** Normalized base (no trailing slash) — matches `getStrapiBaseUrl()` for consistent URLs in dev and production. */
const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
).replace(/\/$/, "");

const parsedTimeoutMs = Number.parseInt(
  process.env.STRAPI_FETCH_TIMEOUT_MS ?? "",
  10,
);
const FETCH_TIMEOUT_MS =
  Number.isFinite(parsedTimeoutMs) && parsedTimeoutMs >= 1000
    ? parsedTimeoutMs
    : 10_000;

const toQueryString = (query?: Record<string, QueryValue>) => {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
};

export const apiClient = {
  async get<T>(
    path: string,
    query?: Record<string, QueryValue>,
    cache?: StrapiFetchCache,
  ): Promise<T> {
    const url = `${STRAPI_URL}${path}${toQueryString(query)}`;
    const revalidateSec = cache?.revalidate ?? STRAPI_ISR_SECONDS;
    const response = await fetch(url, {
      // Next.js 16 Data Cache: ISR window + tag-based on-demand revalidation (webhooks).
      cache: "force-cache",
      next: {
        revalidate: revalidateSec,
        ...(cache?.tags?.length ? { tags: cache.tags } : {}),
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      logger.error("API GET request failed", { path, status: response.status });
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },
};
