import { type ILogObj, type ISettingsParam, Logger } from "tslog";
import { createLoggerSettings } from "./settings";

export { createLoggerSettings } from "./settings";

/**
 * Root logger for an app or subsystem (e.g. `web`, `strapi-admin`).
 * Uses env-driven config — see `createLoggerSettings`.
 */
export function createLogger(
  name: string,
  overrides?: ISettingsParam<ILogObj>,
): Logger<ILogObj> {
  return new Logger<ILogObj>({ name, ...createLoggerSettings(overrides) });
}
