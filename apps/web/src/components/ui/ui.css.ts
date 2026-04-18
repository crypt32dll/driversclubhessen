import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: vars.spacing.containerMax,
  margin: "0 auto",
  width: "100%",
  paddingLeft: vars.spacing.pageX,
  paddingRight: vars.spacing.pageX,
});

export const button = style({
  fontFamily: vars.font.accent,
  fontSize: "0.75rem",
  fontWeight: 900,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  borderRadius: "3px",
  padding: "0.9rem 2rem",
  border: "1px solid transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  cursor: "pointer",
});

export const buttonPrimary = style([
  button,
  {
    color: vars.color.black,
    background: `linear-gradient(135deg, ${vars.color.purple}, ${vars.color.cyanDark})`,
    boxShadow: vars.shadow.glowPurple,
    ":hover": {
      transform: "translateY(-2px) scale(1.03)",
      boxShadow: "0 0 50px rgba(139,47,201,0.8)",
    },
  },
]);

export const buttonOutline = style([
  button,
  {
    borderColor: vars.color.cyan,
    color: vars.color.cyan,
    background: "transparent",
    ":hover": {
      background: "rgba(0,229,255,0.08)",
      transform: "translateY(-2px)",
      boxShadow: vars.shadow.glowCyan,
    },
  },
]);

export const revealBase = style({
  opacity: 0,
  transform: "translateY(24px)",
  transition: "opacity 600ms ease, transform 600ms ease",
});

export const revealVisible = style({
  opacity: 1,
  transform: "translateY(0px)",
});
