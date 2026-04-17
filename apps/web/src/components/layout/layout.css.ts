import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

export const nav = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: "1rem 2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backdropFilter: "blur(12px)",
  background: "rgba(6,6,10,0.8)",
  borderBottom: "1px solid rgba(139,47,201,0.15)",
});

export const navLogo = style({
  fontFamily: vars.font.heading,
  fontSize: "1.3rem",
  letterSpacing: "0.1em",
  background: `linear-gradient(135deg, ${vars.color.purpleLight}, ${vars.color.cyan})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textDecoration: "none",
});

export const navLinks = style({
  display: "flex",
  gap: "1.25rem",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  listStyle: "none",
  margin: 0,
  padding: 0,
  "@media": {
    "(max-width: 600px)": {
      display: "none",
    },
  },
});

export const navLink = style({
  fontFamily: vars.font.accent,
  fontSize: "0.6rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: "rgba(255,255,255,0.55)",
  transition: "color 0.2s",
  ":hover": {
    color: vars.color.cyan,
  },
});

export const footer = style({
  background: vars.color.black,
  borderTop: "1px solid rgba(139,47,201,0.2)",
  padding: "3rem 1.5rem 2rem",
  textAlign: "center",
});

export const footerLogo = style({
  fontFamily: vars.font.heading,
  fontSize: "2rem",
  background: `linear-gradient(135deg, ${vars.color.purpleLight}, ${vars.color.cyan})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "0.5rem",
});

export const footerSub = style({
  fontFamily: vars.font.accent,
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  color: "rgba(255,255,255,0.3)",
  textTransform: "uppercase",
  marginBottom: "2rem",
});

export const footerLinks = style({
  display: "flex",
  gap: "2rem",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "2rem",
});

export const footerLink = style({
  fontFamily: vars.font.accent,
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  color: "rgba(255,255,255,0.35)",
  textDecoration: "none",
  textTransform: "uppercase",
  transition: "color 0.2s",
  ":hover": {
    color: vars.color.cyan,
  },
});

export const footerCopy = style({
  fontSize: "0.8rem",
  color: "rgba(255,255,255,0.2)",
});
