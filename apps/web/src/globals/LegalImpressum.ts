import type { GlobalConfig } from "payload";

import { revalidateLegalImpressum } from "../payload/hooks/revalidate.ts";

export const LegalImpressum: GlobalConfig = {
  slug: "legal-impressum",
  label: "Impressum",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Impressum",
    },
    {
      name: "body",
      type: "richText",
      required: true,
      label: "Inhalt",
    },
  ],
  hooks: {
    afterChange: [revalidateLegalImpressum],
  },
};
