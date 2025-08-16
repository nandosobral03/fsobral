import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fernando Sobral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#d5d0c3",
          color: "#171717",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, textTransform: "uppercase" }}>Fernando Sobral</div>
        <div style={{ fontSize: 32, opacity: 0.8 }}>Software Engineer · Portfolio</div>
      </div>
    ),
    { ...size }
  );
}
