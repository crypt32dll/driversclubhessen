import type { Core } from "@strapi/strapi";

/** Comma-separated origins, e.g. `http://localhost:3000,https://myapp.vercel.app` */
function parseAllowedOrigins(raw: string | undefined): string[] {
  const fallback = "http://localhost:3000";
  if (!raw || !String(raw).trim()) {
    return [fallback];
  }
  return String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * If `ALLOWED_ORIGINS` is unset, use Strapi’s default `strapi::cors` (important for Strapi Cloud admin).
 * When set (comma-separated), restrict CORS for your Next.js frontend on another origin.
 * @see https://docs.strapi.io/cms/configurations/middlewares
 */
export default ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const raw = env("ALLOWED_ORIGINS");
  const corsMiddleware: Core.Config.Middlewares[number] =
    raw && String(raw).trim()
      ? {
          name: "strapi::cors",
          config: {
            origin: parseAllowedOrigins(raw),
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
            headers: ["Content-Type", "Authorization", "Origin", "Accept"],
          },
        }
      : "strapi::cors";

  return [
    "strapi::logger",
    "strapi::errors",
    "strapi::security",
    corsMiddleware,
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
