import type { CollectionConfig } from "payload";

import {
  revalidateGallery,
  revalidateGalleryDelete,
} from "../payload/hooks/revalidate.ts";

export const Galleries: CollectionConfig = {
  slug: "galleries",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGallery],
    afterDelete: [revalidateGalleryDelete],
  },
};
