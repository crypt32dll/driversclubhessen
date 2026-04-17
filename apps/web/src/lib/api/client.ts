import { logger } from "@/lib/logger";

type QueryValue = string | number | boolean | undefined;

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

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
  async get<T>(path: string, query?: Record<string, QueryValue>): Promise<T> {
    const url = `${STRAPI_URL}${path}${toQueryString(query)}`;
    const response = await fetch(url, {
      next: { revalidate: 120 },
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
