import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    purple: "#8b2fc9",
    purpleLight: "#b44fff",
    cyan: "#00e5ff",
    cyanDark: "#00b4cc",
    black: "#06060a",
    dark: "#0c0c14",
    card: "#10101c",
    white: "#f0f0f8",
    textMuted: "rgba(240,240,248,0.7)",
  },
  font: {
    heading: "var(--font-bebas-neue), sans-serif",
    accent: "var(--font-orbitron), monospace",
    body: "var(--font-rajdhani), sans-serif",
  },
  shadow: {
    glowPurple: "0 0 30px rgba(139,47,201,0.6)",
    glowCyan: "0 0 30px rgba(0,229,255,0.5)",
  },
  spacing: {
    pageX: "1.5rem",
    sectionY: "5rem",
    containerMax: "1100px",
  },
});
