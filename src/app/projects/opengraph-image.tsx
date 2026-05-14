import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({ title: "Projects", centered: true, footer: "" });
}
