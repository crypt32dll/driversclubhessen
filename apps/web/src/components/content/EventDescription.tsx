"use client";

import type { Event } from "@driversclub/shared";

type Props = {
  description: Event["description"];
};

export function EventDescription({ description }: Props) {
  const text =
    typeof description === "string" ? description.trim() : "";
  if (!text) return null;

  return (
    <div className="event-description-plain">
      {text.split("\n").map((line, index) => (
        <p key={`${index}-${line.slice(0, 12)}`}>{line}</p>
      ))}
    </div>
  );
}
