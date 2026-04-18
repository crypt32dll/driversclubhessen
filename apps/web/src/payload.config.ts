import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Events } from "./collections/Events.ts";
import { Galleries } from "./collections/Galleries.ts";
import { Media } from "./collections/Media.ts";
import { Users } from "./collections/Users.ts";
import { CommunityFaq } from "./globals/CommunityFaq.ts";
import { CookieBannerGlobal } from "./globals/CookieBannerGlobal.ts";
import { Homepage } from "./globals/Homepage.ts";
import { LegalDatenschutz } from "./globals/LegalDatenschutz.ts";
import { LegalImpressum } from "./globals/LegalImpressum.ts";
import { Navigation } from "./globals/Navigation.ts";
import { livePreviewConfig } from "./lib/payload/live-preview-admin.ts";
import { normalizePostgresUrlForNodePg } from "./lib/postgres-url.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** Neon (Vercel Marketplace) and other hosts usually expose `DATABASE_URL`; some templates use `POSTGRES_URL`. */
const databaseUrl = normalizePostgresUrlForNodePg(
  process.env.DATABASE_URL ??
    process.env.DATABASE_URI ??
    process.env.POSTGRES_URL ??
    "",
);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: livePreviewConfig,
    meta: {
      titleSuffix: " · DriversClub CMS",
      icons: [{ url: "/brand/dch-mark.svg", type: "image/svg+xml" }],
    },
    components: {
      graphics: {
        Logo: {
          path: "./payload/graphics/AdminLogo.tsx",
        },
        Icon: {
          path: "./payload/graphics/AdminIcon.tsx",
        },
      },
    },
  },
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, de },
  },
  collections: [Users, Media, Events, Galleries],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
    push:
      process.env.NODE_ENV === "development" ||
      process.env.DATABASE_PUSH === "true",
  }),
  editor: lexicalEditor(),
  globals: [
    Homepage,
    Navigation,
    CommunityFaq,
    LegalImpressum,
    LegalDatenschutz,
    CookieBannerGlobal,
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
    }),
  ],
});
