#!/usr/bin/env node
/**
 * Cursor hook: scan agent shell output for common error patterns and inject
 * `additional_context` so the model notices failures without manually re-reading output.
 *
 * Handles:
 * - postToolUse (tool_name === Shell, tool_output JSON)
 * - afterShellExecution (command, output string)
 */
import fs from "node:fs";

const stdin = fs.readFileSync(0, "utf8");

const ERROR_LINE = [
  /\[ERROR\]/i,
  /\bError:\s/i,
  /\bFATAL\b/i,
  /npm ERR!/i,
  /ELIFECYCLE/i,
  /Cannot find module/i,
  /UnhandledPromiseRejection/i,
  /⨯\s/i, // Next.js
  /command failed/i,
  /ENOENT/i,
  /EADDRINUSE/i,
];

function extractErrorLines(text) {
  if (!text || typeof text !== "string") return [];
  const out = [];
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    if (ERROR_LINE.some((re) => re.test(line))) out.push(line.trim());
  }
  return out;
}

function buildContext(lines) {
  if (lines.length === 0) return null;
  const body = lines.slice(0, 20).join("\n");
  return `Hook: shell output contains likely error lines — review before continuing:\n${body}`;
}

function emit(additional_context) {
  process.stdout.write(JSON.stringify({ additional_context }));
}

let input;
try {
  input = JSON.parse(stdin || "{}");
} catch {
  process.stdout.write("{}");
  process.exit(0);
}

let text = "";

if (input.tool_name === "Shell" && input.tool_output != null) {
  const raw = input.tool_output;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") {
        text = parsed;
      } else if (parsed && typeof parsed === "object") {
        const parts = [parsed.stdout, parsed.stderr, parsed.output]
          .filter((x) => typeof x === "string")
          .join("\n");
        text = parts || JSON.stringify(parsed);
      } else {
        text = String(parsed);
      }
    } catch {
      text = raw;
    }
  }
}

if (!text && typeof input.output === "string") {
  text = input.output;
}

const lines = extractErrorLines(text);
const ctx = buildContext(lines);
if (ctx) {
  emit(ctx);
} else {
  process.stdout.write("{}");
}
