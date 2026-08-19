import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const alt = "Fraevo — AI-native software engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#0a0b0d",
          color: "#eceee9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#c9f06b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 700,
              color: "#101404",
            }}
          >
            F
          </div>
          <div style={{ fontSize: "30px", fontWeight: 600 }}>Fraevo.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "88px",
              fontWeight: 600,
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            Software, shipped
          </div>
          <div
            style={{
              fontSize: "88px",
              fontWeight: 600,
              letterSpacing: "-3px",
              lineHeight: 1,
              color: "#c9f06b",
              fontStyle: "italic",
            }}
          >
            at speed.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #23262c",
            paddingTop: "28px",
            fontSize: "22px",
            color: "#8a909a",
          }}
        >
          <span>AI-native software engineering</span>
          <span>fraevo.com</span>
        </div>
      </div>
    ),
    size
  );
}