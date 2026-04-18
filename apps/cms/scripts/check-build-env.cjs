/**
 * Runs as `prebuild` so Vercel logs list missing Strapi secrets before `strapi build`.
 * Set SKIP_ENV_CHECK=1 to bypass (local only).
 */
/* eslint-disable no-console */

const PREFIX = "[cms:build-env]";

const REQUIRED = [
  "APP_KEYS",
  "API_TOKEN_SALT",
  "ADMIN_JWT_SECRET",
  "TRANSFER_TOKEN_SALT",
  "JWT_SECRET",
  "ENCRYPTION_KEY",
];

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

function looksLikePlaceholder(value) {
  if (!value || typeof value !== "string") return true;
  const v = value.trim().toLowerCase();
  if (v.length < 8) return true;
  return (
    v.includes("tobemodified") || v === "change-me" || /^changeme/i.test(v)
  );
}

function main() {
  const strict = isStrict();
  log("INFO", `check (strict=${strict}, VERCEL=${process.env.VERCEL ?? "0"})`);

  let failed = false;
  for (const key of REQUIRED) {
    const val = process.env[key];
    if (!val || !String(val).trim()) {
      // In strict mode (Vercel/CI) this fails the build; elsewhere WARN avoids fake "errors" in Strapi Cloud logs.
      log(
        strict ? "ERROR" : "WARN",
        `${key} is missing or empty`,
      );
      failed = true;
      continue;
    }
    if (looksLikePlaceholder(val)) {
      log(
        "WARN",
        `${key} still looks like a placeholder — set a strong secret in your hosting env.`,
      );
    } else {
      log("OK", `${key} is set`);
    }
  }

  const optional = ["DATABASE_URL", "ADMIN_PATH", "STRAPI_ADMIN_BACKEND_URL"];
  for (const key of optional) {
    if (process.env[key]) log("OK", `${key} is set`);
  }

  if (failed && strict) {
    log(
      "ERROR",
      "Fix the variables above (hosting dashboard → Environment Variables) and redeploy.",
    );
    process.exit(1);
  }

  if (failed && !strict) {
    log(
      "WARN",
      "Some required Strapi secrets are missing — strapi build may still work locally with .env; production needs real values.",
    );
  }

  log("INFO", "env check finished");
}

main();
