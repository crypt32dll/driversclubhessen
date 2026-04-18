import type { GlobalConfig } from "payload";

import { revalidateCookieBanner } from "../payload/hooks/revalidate.ts";

export const CookieBannerGlobal: GlobalConfig = {
  slug: "cookie-banner",
  label: "Cookie-Banner",
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
    },
    {
      name: "acceptLabel",
      type: "text",
      defaultValue: "Alle akzeptieren",
    },
    {
      name: "rejectLabel",
      type: "text",
      defaultValue: "Nur notwendige",
    },
  ],
  hooks: {
    afterChange: [revalidateCookieBanner],
  },
};
