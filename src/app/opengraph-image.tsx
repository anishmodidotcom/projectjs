import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jayna Sippy — Brand Consultant, Marketer & Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAF6F1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          fontFamily:
            "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            color: "#2B2522",
            fontSize: 140,
            fontWeight: 400,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          Jayna Sippy
        </div>
        <div
          style={{
            marginTop: 32,
            color: "#7A2E3A",
            fontSize: 36,
            letterSpacing: 1,
          }}
        >
          Brand Consultant · Marketer · Founder
        </div>
      </div>
    ),
    { ...size }
  );
}
