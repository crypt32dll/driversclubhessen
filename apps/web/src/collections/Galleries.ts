import type { CollectionConfig } from "payload";

import {
  revalidateGallery,
  revalidateGalleryDelete,
} from "../payload/hooks/revalidate.ts";

export const Galleries: CollectionConfig = {
  slug: "galleries",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "_status", "updatedAt"],
    description:
      "Einzelbilder fuer die Galerie-Seite unter /gallery. Veroeffentlichte Eintraege erscheinen im Raster; Entwuerfe nicht.",
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
      admin: {
        description: "Bildunterschrift / Titel unter dem Foto auf /gallery.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Das angezeigte Galerie-Bild. Alt-Text kommt aus dem Medien-Eintrag.",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGallery],
    afterDelete: [revalidateGalleryDelete],
  },
};
