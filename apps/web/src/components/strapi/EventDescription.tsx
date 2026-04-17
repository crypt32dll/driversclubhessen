"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

import type { Event } from "@driversclub/shared";

type Props = {
  description: Event["description"];
};

export function EventDescription({ description }: Props) {
  if (Array.isArray(description)) {
    return (
      <div className="strapi-blocks">
        <BlocksRenderer content={description as BlocksContent} />
      </div>
    );
  }

  const text = description.trim();
  if (!text) return null;

  return (
    <div className="strapi-richtext-plain">
      {text.split("\n").map((line, index) => (
        <p key={`${index}-${line.slice(0, 12)}`}>{line}</p>
      ))}
    </div>
  );
}
