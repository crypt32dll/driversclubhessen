import type { GlobalConfig } from "payload";

import { homepageLayoutBlocks } from "../blocks/homepage/index.ts";
import { revalidateHomepage } from "../payload/hooks/revalidate.ts";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "layout",
      type: "blocks",
      label: "Seitenaufbau",
      admin: {
        description:
          "Reihenfolge der Blöcke = Reihenfolge auf der Startseite. Leer = Standard-Fallback aus dem Frontend.",
      },
      blocks: homepageLayoutBlocks,
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
};
