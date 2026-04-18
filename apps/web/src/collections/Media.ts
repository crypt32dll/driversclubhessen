import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    description:
      "Zentrale Bilddateien. Alt-Texte sind Pflicht fuer Barrierefreiheit und SEO; sie werden bei next/image und Screenreadern genutzt.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Kurze Bildbeschreibung (was zu sehen ist). Wird als alt-Attribut ausgespielt — nicht keyword-stuffen, sondern inhaltlich treffend.",
      },
    },
  ],
  upload: true,
};
