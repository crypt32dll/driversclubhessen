/**
 * RFC 5545 text escaping and line folding for iCalendar.
 */

export function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Fold a content line to max 75 octets per line (CRLF between segments).
 */
export function foldIcsContentLine(line: string): string {
  const max = 75;
  if (line.length <= max) return line;
  const parts: string[] = [];
  let i = 0;
  while (i < line.length) {
    const chunk =
      i === 0 ? line.slice(i, i + max) : ` ${line.slice(i, i + max - 1)}`;
    parts.push(chunk);
    i += i === 0 ? max : max - 1;
  }
  return parts.join("\r\n");
}
