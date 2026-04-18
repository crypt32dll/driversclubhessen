import type { GlobalConfig } from "payload";

import { revalidateCookieBanner } from "../payload/hooks/revalidate.ts";

export const CookieBannerGlobal: GlobalConfig = {
  slug: "cookie-banner",
  label: "Cookie-Banner",
  admin: {
    description:
      "Texte und Schaltflaechen des Cookie-Hinweises (erscheint auf allen Marketing-Seiten bis zur Entscheidung).",
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Hinweistext",
      defaultValue:
        "Wir verwenden nur technisch notwendige Cookies. Optionale Cookies werden erst nach deiner Einwilligung aktiviert.",
      admin: {
        description: "Haupttext im Banner-Dialog.",
      },
    },
    {
      name: "acceptLabel",
      type: "text",
      defaultValue: "Alle akzeptieren",
      admin: {
        description: "Beschriftung der Zustimmen-Schaltflaeche.",
      },
    },
    {
      name: "rejectLabel",
      type: "text",
      defaultValue: "Nur notwendige",
      admin: {
        description: "Beschriftung fuer ablehnen / nur notwendige Cookies.",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCookieBanner],
  },
};
