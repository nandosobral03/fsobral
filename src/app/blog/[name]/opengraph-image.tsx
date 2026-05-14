import { getPostMetadata } from "../posts-metadata";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const awaited = await params;
  const slug = decodeURIComponent(awaited.name);
  const post = getPostMetadata(slug);

  return renderOgImage({
    title: post?.title ?? slug,
    subtitle: post?.subtitle ?? post?.description ?? "",
  });
}
