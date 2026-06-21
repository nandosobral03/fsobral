import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { blogOgMetadata } from "../blog-og-metadata";

export const runtime = "edge";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const awaited = await params;
  const name = decodeURIComponent(awaited.name);
  const post = blogOgMetadata.find((entry) => entry.slug === name);

  return renderOgImage({
    title: post?.title ?? name,
    subtitle: post?.subtitle ?? post?.description ?? "",
  });
}
