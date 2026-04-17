/**
 * Runs as `prebuild` so Vercel logs show missing/invalid env before `next build` fails opaquely.
 * Set SKIP_ENV_CHECK=1 to bypass (local experiments only).
 */
/* eslint-disable no-console */

const PREFIX = "[web:build-env]";

function isStrict() {
  return (
    process.env.SKIP_ENV_CHECK === "1" ||
    process.env.SKIP_ENV_CHECK === "true"
  )
    ? false
    : process.env.VERCEL === "1" || process.env.CI === "true";
}

function log(kind, msg) {
  const line = `${PREFIX} ${kind} ${msg}`;
  if (kind === "ERROR") console.error(line);
  else if (kind === "WARN") console.warn(line);
  else console.log(line);
}

function validPublicStrapiUrl(value) {
  if (!value || typeof value !== "string" || !value.trim()) return false;
  try {
    const u = new URL(value.trim());
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    return !!u.hostname;
  } catch {
    return false;
  }
}

/** Only Production deploys must use https; Preview builds also run with NODE_ENV=production. */
function needsProductionHttps() {
  return process.env.VERCEL_ENV === "production";
}

const optional = [
  "STRAPI_FETCH_TIMEOUT_MS",
  "STRAPI_ISR_REVALIDATE_SECONDS",
  "REVALIDATE_SECRET",
  "LOG_LEVEL",
  "LOG_FORMAT",
];

function main() {
  const strict = isStrict();
  log("INFO", `check (strict=${strict}, VERCEL=${process.env.VERCEL ?? "0"})`);

  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!validPublicStrapiUrl(url)) {
    const detail =
      url === undefined || String(url).trim() === ""
        ? "unset or empty"
        : `invalid URL (${String(url).slice(0, 80)})`;
    if (strict) {
      log(
        "ERROR",
        `NEXT_PUBLIC_STRAPI_URL is required on Vercel/CI — ${detail}. Set it in Project → Settings → Environment Variables.`,
      );
      process.exit(1);
    }
    log(
      "WARN",
      `NEXT_PUBLIC_STRAPI_URL ${detail} (allowed locally; production deploys must set a public Strapi base URL).`,
    );
  } else {
    try {
      const u = new URL(String(url).trim());
      if (needsProductionHttps() && u.protocol !== "https:") {
        if (strict) {
          log(
            "ERROR",
            "NEXT_PUBLIC_STRAPI_URL must use https in production (Vercel production / NODE_ENV=production).",
          );
          process.exit(1);
        }
        log(
          "WARN",
          "NEXT_PUBLIC_STRAPI_URL should use https in production.",
        );
      }
    } catch {
      /* validated above */
    }
    log("OK", "NEXT_PUBLIC_STRAPI_URL is set and looks like a valid URL");
  }

  if (strict && !process.env.REVALIDATE_SECRET) {
    log(
      "WARN",
      "REVALIDATE_SECRET is unset — POST /api/revalidate will reject until you set it (Strapi webhooks).",
    );
  }

  for (const key of optional) {
    if (process.env[key]) log("OK", `${key} is set`);
  }

  log("INFO", "env check finished");
}

main();
