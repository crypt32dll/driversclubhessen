import type { Event } from "@driversclub/shared";

function textFromBlocks(blocks: unknown[]): string {
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;
    const b = block as { type?: string; children?: unknown[] };
    if (b.type === "paragraph" && Array.isArray(b.children)) {
      const parts = b.children
        .map((child) => {
          if (!child || typeof child !== "object") return "";
          const c = child as {
            type?: string;
            text?: string;
            children?: unknown[];
          };
          if (c.type === "text" && typeof c.text === "string") return c.text;
          if (Array.isArray(c.children)) {
            return c.children
              .map((x) =>
                x && typeof x === "object" && "text" in (x as object)
                  ? String((x as { text: string }).text)
                  : "",
              )
              .join("");
          }
          return "";
        })
        .join("");
      if (parts.trim()) return parts.trim();
    }
  }
  return "";
}

export function excerptFromEventDescription(
  description: Event["description"],
  max = 140,
): string {
  if (typeof description === "string") {
    const t = description.trim();
    if (t.length <= max) return t;
    return `${t.slice(0, max)}…`;
  }
  const fromBlocks = textFromBlocks(description);
  if (!fromBlocks) return "";
  if (fromBlocks.length <= max) return fromBlocks;
  return `${fromBlocks.slice(0, max)}…`;
}
