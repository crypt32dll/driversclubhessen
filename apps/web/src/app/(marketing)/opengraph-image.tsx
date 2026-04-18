import { ImageResponse } from "next/og";

export const alt = "DriversClub Hessen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image for marketing routes (event pages add their own photo when available). */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#06060a",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: "0.08em",
          color: "#00e5ff",
        }}
      >
        DCH
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "rgba(240,240,248,0.85)",
          textTransform: "uppercase",
        }}
      >
        DriversClub Hessen
      </div>
    </div>,
    { ...size },
  );
}
