import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — matches `public/brand/dch-mark.svg` look (rounded tile + DCH). */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#06060a",
        borderRadius: 36,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 140,
          height: 140,
          borderRadius: 28,
          border: "2px solid rgba(0, 229, 255, 0.35)",
          background: "rgba(12,12,20,0.95)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: "0.06em",
          color: "#00e5ff",
        }}
      >
        DCH
      </div>
    </div>,
    { ...size },
  );
}
