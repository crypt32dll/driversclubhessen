import { ImageResponse } from "next/og";

/** PNG favicon — works reliably on Vercel + clients that only request `/favicon.ico`. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#06060a",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 24,
          height: 24,
          borderRadius: 6,
          background: "linear-gradient(135deg, #00e5ff, #8b2fc9)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 11,
            height: 16,
            borderRadius: 3,
            background: "#06060a",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
