import type { GlobalConfig } from "payload";

import { revalidateCommunityFaq } from "../payload/hooks/revalidate.ts";

export const CommunityFaq: GlobalConfig = {
  slug: "community-faq",
  label: "FAQ & Community",
  admin: {
    description:
      "Inhalt der Seite /faq (Regeln, Gruppenstruktur, Partner). Leer = festes Fallback aus dem Frontend.",
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
      defaultValue: "FAQ & Community",
      admin: {
        description: "H1 auf /faq.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Meta-Beschreibung (optional)",
      admin: {
        description:
          "Kurztext für Suchmaschinen / Social. Leer = Standardbeschreibung aus dem Code.",
      },
    },
    {
      name: "body",
      type: "richText",
      label: "Inhalt (optional)",
      admin: {
        description:
          "Wenn gesetzt, ersetzt dieser Block den Standard-Text aus dem Frontend vollständig.",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCommunityFaq],
  },
};
