import NotFound from "@/components/sections/NotFound";
import { blogPosts } from "@/content";
import Article from "./article";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const post = blogPosts.fromRouteParam(name);
  if (!post) return {};
  return blogPosts.metadata(post);
}

export default async function PostPage({ params }: { params: Promise<{ name: string }> }) {
  const awaitedParams = await params;
  const post = blogPosts.fromRouteParam(awaitedParams.name);

  if (!post) {
    return <NotFound type="post" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosts.jsonLd(post)) }} />
      <Article post={post} />
    </>
  );
}
