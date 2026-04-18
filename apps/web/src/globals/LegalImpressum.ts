import type { GlobalConfig } from "payload";

import { revalidateLegalImpressum } from "../payload/hooks/revalidate.ts";

export const LegalImpressum: GlobalConfig = {
  slug: "legal-impressum",
  label: "Impressum",
  admin: {
    description: "Inhalt der Seite /legal/impressum (Titel + Rich Text).",
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
      defaultValue: "Impressum",
      admin: {
        description: "Seitenueberschrift auf /legal/impressum.",
      },
    },
    {
      name: "body",
      type: "richText",
      required: true,
      label: "Inhalt",
      admin: {
        description: "Rechtlicher Impressum-Text (wird auf der Impressum-Route gerendert).",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateLegalImpressum],
  },
};
