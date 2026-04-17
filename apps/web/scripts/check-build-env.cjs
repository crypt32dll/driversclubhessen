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

function logBuildContext() {
  log("INFO", "=== build context (Vercel / CI diagnostics) ===");
  log("INFO", `cwd=${process.cwd()}`);
  log("INFO", `node=${process.version}`);
  log("INFO", `platform=${process.platform} arch=${process.arch}`);
  if (process.env.VERCEL === "1") {
    log("INFO", `VERCEL_ENV=${process.env.VERCEL_ENV ?? "(unset)"}`);
    log("INFO", `VERCEL_URL=${process.env.VERCEL_URL ?? "(unset)"}`);
    log("INFO", `VERCEL_REGION=${process.env.VERCEL_REGION ?? "(unset)"}`);
    const ref = process.env.VERCEL_GIT_COMMIT_REF ?? "";
    log(
      "INFO",
      `VERCEL_GIT_COMMIT_REF=${ref ? ref.slice(0, 48) + (ref.length > 48 ? "…" : "") : "(unset)"}`,
    );
    log(
      "INFO",
      `VERCEL_GIT_COMMIT_SHA=${(process.env.VERCEL_GIT_COMMIT_SHA ?? "").slice(0, 7) || "(unset)"}`,
    );
  }
  if (process.env.GITHUB_SHA) {
    log(
      "INFO",
      `GITHUB_SHA=${String(process.env.GITHUB_SHA).slice(0, 7)}`,
    );
  }
  log("INFO", "=== env validation ===");
}

function logRemediation() {
  console.error("");
  console.error(`${PREFIX} ERROR --- Fix checklist (Vercel) ---`);
  console.error(
    `${PREFIX} ERROR 1. Project → Settings → Environment Variables: set NEXT_PUBLIC_STRAPI_URL (public https Strapi base URL; trim whitespace).`,
  );
  console.error(
    `${PREFIX} ERROR 2. Production: URL must be https. Preview/CI may use http only if policy allows.`,
  );
  console.error(
    `${PREFIX} ERROR 3. Redeploy after changing env (Preview vs Production scopes).`,
  );
  console.error(
    `${PREFIX} ERROR 4. Monorepo: Root Directory should be repo root; Install Command / Build Command use root package.json (e.g. npm install; npm run build).`,
  );
  console.error(`${PREFIX} ERROR --- end checklist ---`);
  console.error("");
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
  logBuildContext();
  log(
    "INFO",
    `check (strict=${strict}, VERCEL=${process.env.VERCEL ?? "0"}, CI=${process.env.CI ?? ""})`,
  );

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
      logRemediation();
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
          logRemediation();
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
