import { blogPosts } from "@/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const awaited = await params;
  const post = blogPosts.fromRouteParam(awaited.name);

  return renderOgImage(blogPosts.ogImage(post, decodeURIComponent(awaited.name)));
}
