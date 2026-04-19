import { vars } from "@/styles/tokens.css";
import { style } from "@vanilla-extract/css";

/** Extra scroll padding so fixed FAB does not cover last content on event detail. */
export const eventDetailMainWithFab = style({
  paddingBottom: "5.5rem",
});

const fabSize = "3.5rem";

export const fabWrap = style({
  position: "fixed",
  right: "max(1rem, env(safe-area-inset-right, 0px))",
  bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
  zIndex: 60,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "0.5rem",
  pointerEvents: "none",
});

export const fabButton = style({
  pointerEvents: "auto",
  width: fabSize,
  height: fabSize,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "50%",
  border: "1px solid rgba(0, 229, 255, 0.45)",
  background: `linear-gradient(145deg, ${vars.color.card} 0%, rgba(12,12,20,0.96) 100%)`,
  color: vars.color.cyan,
  boxShadow: `${vars.shadow.glowCyan}, 0 8px 24px rgba(0,0,0,0.45)`,
  transition: "transform 0.15s ease, border-color 0.15s ease, color 0.15s ease",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
      borderColor: vars.color.cyanDark,
      color: vars.color.white,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.cyan}`,
      outlineOffset: 3,
    },
    "&:active": {
      transform: "scale(0.97)",
    },
  },
});

export const fabIcon = style({
  width: "1.35rem",
  height: "1.35rem",
  display: "block",
});

export const fabToast = style({
  display: "block",
  pointerEvents: "none",
  maxWidth: "14rem",
  padding: "0.45rem 0.65rem",
  borderRadius: "8px",
  fontFamily: vars.font.body,
  fontSize: "0.8rem",
  lineHeight: 1.35,
  color: vars.color.white,
  background: "rgba(12, 12, 20, 0.92)",
  border: "1px solid rgba(0, 229, 255, 0.25)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
});
