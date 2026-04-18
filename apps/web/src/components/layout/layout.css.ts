import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

const navBreakpoint = "601px";

export const nav = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: "1rem 1.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backdropFilter: "blur(12px)",
  background: "rgba(6,6,10,0.8)",
  borderBottom: "1px solid rgba(139,47,201,0.15)",
  "@media": {
    [`(min-width: ${navBreakpoint})`]: {
      padding: "1rem 2rem",
    },
  },
});

export const navBar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "1rem",
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
  display: "none",
  gap: "1.25rem",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  listStyle: "none",
  margin: 0,
  padding: 0,
  "@media": {
    [`(min-width: ${navBreakpoint})`]: {
      display: "flex",
    },
  },
});

export const navToggle = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "44px",
  height: "44px",
  padding: "10px",
  margin: "0 0 0 auto",
  border: "1px solid rgba(0, 229, 255, 0.25)",
  borderRadius: "6px",
  background: "rgba(12,12,20,0.9)",
  cursor: "pointer",
  color: vars.color.cyan,
  flexShrink: 0,
  transition: "border-color 0.2s, background 0.2s",
  ":hover": {
    borderColor: vars.color.cyan,
    background: "rgba(139,47,201,0.12)",
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.cyan}`,
    outlineOffset: "2px",
  },
  "@media": {
    [`(min-width: ${navBreakpoint})`]: {
      display: "none",
    },
  },
});

export const navToggleLine = style({
  display: "block",
  width: "20px",
  height: "2px",
  borderRadius: "1px",
  background: "currentColor",
  transition: "transform 0.2s ease, opacity 0.2s ease",
});

export const navToggleLineTopOpen = style({
  transform: "translateY(8px) rotate(45deg)",
});

export const navToggleLineMidOpen = style({
  opacity: 0,
  transform: "scaleX(0)",
});

export const navToggleLineBotOpen = style({
  transform: "translateY(-8px) rotate(-45deg)",
});

export const mobileOverlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 1001,
  pointerEvents: "none",
  visibility: "hidden",
  transition: "visibility 0.25s linear",
});

export const mobileOverlayVisible = style({
  pointerEvents: "auto",
  visibility: "visible",
});

export const mobileBackdrop = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  display: "block",
  width: "100%",
  height: "100%",
  appearance: "none",
  border: "none",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  background: "rgba(0,0,0,0.65)",
  opacity: 0,
  transition: "opacity 0.25s ease",
  WebkitTapHighlightColor: "transparent",
  selectors: {
    [`${mobileOverlayVisible} &`]: {
      opacity: 1,
    },
  },
});

export const mobilePanel = style({
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 1,
  height: "100%",
  width: "min(300px, 88vw)",
  maxWidth: "100%",
  background: `linear-gradient(180deg, ${vars.color.dark} 0%, ${vars.color.black} 100%)`,
  borderLeft: "1px solid rgba(139,47,201,0.35)",
  boxShadow: "-8px 0 32px rgba(0,0,0,0.5)",
  transform: "translateX(100%)",
  transition: "transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)",
  display: "flex",
  flexDirection: "column",
  padding: "1rem 1.25rem 1.5rem",
  selectors: {
    [`${mobileOverlayVisible} &`]: {
      transform: "translateX(0)",
    },
  },
});

export const mobilePanelHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1.25rem",
  paddingBottom: "0.75rem",
  borderBottom: "1px solid rgba(139,47,201,0.2)",
});

export const mobilePanelTitle = style({
  fontFamily: vars.font.accent,
  fontSize: "0.65rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
});

export const mobileClose = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  border: "none",
  borderRadius: "6px",
  background: "transparent",
  color: "rgba(255,255,255,0.6)",
  fontSize: "1.5rem",
  lineHeight: 1,
  cursor: "pointer",
  transition: "color 0.2s, background 0.2s",
  ":hover": {
    color: vars.color.cyan,
    background: "rgba(0,229,255,0.08)",
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.cyan}`,
    outlineOffset: "2px",
  },
});

export const mobileNavList = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const mobileNavLink = style({
  display: "block",
  fontFamily: vars.font.accent,
  fontSize: "0.75rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: "rgba(255,255,255,0.75)",
  padding: "0.85rem 0.75rem",
  borderRadius: "6px",
  transition: "color 0.2s, background 0.2s",
  ":hover": {
    color: vars.color.cyan,
    background: "rgba(0,229,255,0.06)",
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
