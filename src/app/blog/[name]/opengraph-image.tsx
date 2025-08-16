import { ImageResponse } from "next/og";
import { postsMetadata } from "../posts-metadata";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const awaited = await params;
  const slug = decodeURIComponent(awaited.name);
  const post = postsMetadata.find((p) => p.slug === slug);

  const title = post?.title ?? slug;
  const subtitle = post?.subtitle ?? post?.description ?? "";

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
        <div style={{ fontSize: 56, fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 28, opacity: 0.8, marginTop: 12 }}>{subtitle}</div>}
        <div style={{ position: "absolute", bottom: 32, right: 48, fontSize: 28, fontWeight: 700 }}>fernandosobral.dev</div>
      </div>
    ),
    { ...size }
  );
}
