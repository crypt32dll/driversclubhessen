import type { GlobalConfig } from "payload";

import { revalidateLegalDatenschutz } from "../payload/hooks/revalidate.ts";

export const LegalDatenschutz: GlobalConfig = {
  slug: "legal-datenschutz",
  label: "Datenschutz",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Datenschutz",
    },
    {
      name: "body",
      type: "richText",
      required: true,
      label: "Inhalt",
    },
  ],
  hooks: {
    afterChange: [revalidateLegalDatenschutz],
  },
};
