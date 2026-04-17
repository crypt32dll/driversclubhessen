"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

type Props = {
  content: BlocksContent;
  className?: string;
};

/** Strapi Blocks JSON → React (richtext / blocks field). */
export function StrapiBlocks({ content, className = "strapi-blocks" }: Props) {
  return (
    <div className={className}>
      <BlocksRenderer content={content} />
    </div>
  );
}
