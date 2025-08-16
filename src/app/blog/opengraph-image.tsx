import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#d5d0c3", color: "#171717" }}>
        <div style={{ fontSize: 64, fontWeight: 800, textTransform: "uppercase" }}>Blog</div>
      </div>
    ),
    { ...size }
  );
}
