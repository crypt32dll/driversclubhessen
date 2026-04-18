import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    // Replaces deprecated auth.options.expiresIn (Strapi 6); defaults match core:
    // https://docs.strapi.io/cms/configurations/admin-panel#session-management
    sessions: {
      maxRefreshTokenLifespan: 30 * 24 * 60 * 60, // 30d (2592000s)
      maxSessionLifespan: 30 * 24 * 60 * 60,
    },
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});

export default config;
