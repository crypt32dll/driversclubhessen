import type { ILogObj, ISettingsParam } from "tslog";

const LEVEL_BY_NAME: Record<string, number> = {
  silly: 0,
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  fatal: 6,
};

function parseMinLevel(value: string | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const byName = LEVEL_BY_NAME[value.toLowerCase()];
  if (byName !== undefined) return byName;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
}

function resolveLogType():
  | NonNullable<ISettingsParam<ILogObj>["type"]>
  | undefined {
  const explicit = process.env.LOG_FORMAT?.toLowerCase();
  if (explicit === "json") return "json";
  if (explicit === "pretty") return "pretty";

  const nodeEnv = process.env.NODE_ENV ?? "development";
  const vercel = process.env.VERCEL === "1";
  if (nodeEnv === "production" || vercel) return "json";
  return "pretty";
}

/**
 * Base tslog settings for Node (Next.js, Strapi). Safe defaults:
 * - **Local:** pretty logs, debug-level noise allowed via `LOG_LEVEL`.
 * - **Vercel / production:** one-line JSON for log drains; positions hidden for perf.
 *
 * Override with `LOG_FORMAT=json|pretty`, `LOG_LEVEL=info|3`, `LOG_HIDE_POSITION=0|1`.
 */
export function createLoggerSettings(
  overrides?: ISettingsParam<ILogObj>,
): ISettingsParam<ILogObj> {
  const nodeEnv = process.env.NODE_ENV ?? "development";
  const vercel = process.env.VERCEL === "1";

  const type = resolveLogType() ?? "pretty";

  const hideLogPositionExplicit = process.env.LOG_HIDE_POSITION;
  const hideLogPositionForProduction =
    hideLogPositionExplicit === "1"
      ? true
      : hideLogPositionExplicit === "0"
        ? false
        : nodeEnv === "production" || vercel;

  const defaultMinLevel = nodeEnv === "development" ? 2 : 3;
  const minLevel = parseMinLevel(process.env.LOG_LEVEL) ?? defaultMinLevel;

  return {
    type,
    minLevel,
    hideLogPositionForProduction,
    ...overrides,
  };
}
