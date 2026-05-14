import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = site.author;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: site.author,
    subtitle: "Software Engineer - Portfolio",
    footer: "",
  });
}
