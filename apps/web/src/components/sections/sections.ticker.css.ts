import { tickerAnim } from "@/styles/keyframes.css";
import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

export const ticker = style({
  background: `linear-gradient(90deg, ${vars.color.purple}, ${vars.color.cyanDark})`,
  padding: "0.6rem 0",
  overflow: "hidden",
  position: "relative",
});

export const tickerTrack = style({
  display: "flex",
  gap: "4rem",
  animation: `${tickerAnim} 20s linear infinite`,
  whiteSpace: "nowrap",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
});

export const tickerItem = style({
  fontFamily: vars.font.heading,
  fontSize: "1rem",
  letterSpacing: "0.2em",
  color: "rgba(0,0,0,0.75)",
  flexShrink: 0,
});
