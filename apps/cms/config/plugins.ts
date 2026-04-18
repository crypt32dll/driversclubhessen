import type { Core } from "@strapi/strapi";

/**
 * Cloudinary upload is **opt-in** (`CLOUDINARY_UPLOAD=true`) so Strapi Cloud (managed storage)
 * is not overridden by accident. Self-hosted (Railway, etc.): set the four vars below.
 * @see https://docs.strapi.io/cms/configurations/media-library-providers/cloudinary
 */
const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const uploadFlag = String(env("CLOUDINARY_UPLOAD") ?? "").toLowerCase();
  const optedIn = uploadFlag === "true" || uploadFlag === "1";
  const hasCloudinary =
    Boolean(env("CLOUDINARY_NAME")) &&
    Boolean(env("CLOUDINARY_KEY")) &&
    Boolean(env("CLOUDINARY_SECRET"));

  if (!optedIn || !hasCloudinary) {
    return {};
  }

  return {
    upload: {
      config: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};

export default config;
