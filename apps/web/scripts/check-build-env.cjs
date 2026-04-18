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
    `${PREFIX} ERROR 1. Project → Settings → Environment Variables: set PAYLOAD_SECRET, DATABASE_URL (Neon/Vercel Marketplace usually injects this), and NEXT_PUBLIC_APP_URL (public site URL for media links, e.g. https://your-domain.com).`,
  );
  console.error(
    `${PREFIX} ERROR 2. Optional: BLOB_READ_WRITE_TOKEN for Vercel Blob uploads (otherwise local/ephemeral storage in dev only).`,
  );
  console.error(
    `${PREFIX} ERROR 3. Redeploy after changing env (Preview vs Production scopes).`,
  );
  console.error(`${PREFIX} ERROR --- end checklist ---`);
  console.error("");
}

function needsProductionHttps() {
  return process.env.VERCEL_ENV === "production";
}

function isNonEmpty(s) {
  return typeof s === "string" && s.trim().length > 0;
}

const optional = [
  "CMS_ISR_REVALIDATE_SECONDS",
  "STRAPI_ISR_REVALIDATE_SECONDS",
  "REVALIDATE_SECRET",
  "LOG_LEVEL",
  "LOG_FORMAT",
  "BLOB_READ_WRITE_TOKEN",
];

function main() {
  const strict = isStrict();
  logBuildContext();
  log(
    "INFO",
    `check (strict=${strict}, VERCEL=${process.env.VERCEL ?? "0"}, CI=${process.env.CI ?? ""})`,
  );

  const dbUrl =
    process.env.DATABASE_URL?.trim() ||
    process.env.DATABASE_URI?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (!isNonEmpty(dbUrl)) {
    if (strict) {
      log(
        "ERROR",
        "DATABASE_URL, DATABASE_URI, or POSTGRES_URL is required on Vercel/CI for Payload + Postgres (Neon sets DATABASE_URL when integrated).",
      );
      logRemediation();
      process.exit(1);
    }
    log(
      "WARN",
      "DATABASE_URL / DATABASE_URI / POSTGRES_URL unset (allowed locally; required for production).",
    );
  } else {
    log("OK", "Database connection string is set (DATABASE_URL / DATABASE_URI / POSTGRES_URL)");
  }

  if (!isNonEmpty(process.env.PAYLOAD_SECRET)) {
    if (strict) {
      log("ERROR", "PAYLOAD_SECRET is required on Vercel/CI.");
      logRemediation();
      process.exit(1);
    }
    log("WARN", "PAYLOAD_SECRET unset (allowed locally; required for production).");
  } else {
    log("OK", "PAYLOAD_SECRET is set");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!isNonEmpty(appUrl)) {
    if (strict) {
      log(
        "WARN",
        "NEXT_PUBLIC_APP_URL unset — image URLs in emails/absolute links may be wrong; set to your public site origin (e.g. https://example.com).",
      );
    } else {
      log(
        "INFO",
        "NEXT_PUBLIC_APP_URL unset (optional locally; set on Vercel for correct media absolute URLs).",
      );
    }
  } else {
    try {
      const u = new URL(
        appUrl.startsWith("http") ? appUrl : `https://${appUrl}`,
      );
      if (needsProductionHttps() && u.protocol !== "https:") {
        if (strict) {
          log(
            "ERROR",
            "NEXT_PUBLIC_APP_URL must use https in production.",
          );
          logRemediation();
          process.exit(1);
        }
        log("WARN", "NEXT_PUBLIC_APP_URL should use https in production.");
      }
    } catch {
      if (strict) {
        log("ERROR", "NEXT_PUBLIC_APP_URL is not a valid URL.");
        logRemediation();
        process.exit(1);
      }
    }
    log("OK", "NEXT_PUBLIC_APP_URL is set");
  }

  if (strict && !process.env.REVALIDATE_SECRET) {
    log(
      "WARN",
      "REVALIDATE_SECRET is unset — POST /api/revalidate will reject until you set it.",
    );
  }

  for (const key of optional) {
    if (process.env[key]) log("OK", `${key} is set`);
  }

  log("INFO", "env check finished");
}

main();
