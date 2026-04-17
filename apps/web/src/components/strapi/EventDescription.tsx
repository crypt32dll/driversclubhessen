"use client";

import type { BlocksContent } from "@strapi/blocks-react-renderer";

import { StrapiBlocks } from "@/components/strapi/StrapiBlocks";

import type { Event } from "@driversclub/shared";

type Props = {
  description: Event["description"];
};

export function EventDescription({ description }: Props) {
  if (Array.isArray(description)) {
    return <StrapiBlocks content={description as BlocksContent} />;
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
