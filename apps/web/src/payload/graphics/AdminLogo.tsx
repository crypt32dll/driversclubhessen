"use client";

import React from "react";

/**
 * Login screen logo — matches marketing nav wordmark (gradient “DCH”).
 * @see https://payloadcms.com/docs/custom-components/overview
 */
export default function AdminLogo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.35rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <span
        style={{
          fontSize: "1.75rem",
          fontWeight: 800,
          letterSpacing: "0.12em",
          background: "linear-gradient(135deg, #b44fff, #00e5ff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundClip: "text",
        }}
      >
        DCH
      </span>
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--theme-elevation-600, rgba(0,0,0,0.55))",
        }}
      >
        DriversClub Hessen
      </span>
    </div>
  );
}
