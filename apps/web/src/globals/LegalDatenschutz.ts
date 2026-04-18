import type { GlobalConfig } from "payload";

import { revalidateLegalDatenschutz } from "../payload/hooks/revalidate.ts";

export const LegalDatenschutz: GlobalConfig = {
  slug: "legal-datenschutz",
  label: "Datenschutz",
  admin: {
    description: "Inhalt der Seite /legal/datenschutz (Titel + Rich Text).",
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
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Datenschutz",
      admin: {
        description: "Seitenueberschrift auf /legal/datenschutz.",
      },
    },
    {
      name: "body",
      type: "richText",
      required: true,
      label: "Inhalt",
      admin: {
        description: "Datenschutzerklaerung (wird auf der Datenschutz-Route gerendert).",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateLegalDatenschutz],
  },
};
