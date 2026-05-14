import NotFound from "@/components/sections/NotFound";
import { getPost } from "../posts";
import { getPostMetadata } from "../posts-metadata";
import Article from "./article";
import { articleMetadata, blogPostJsonLd } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const meta = getPostMetadata(slug);
  if (!meta) return {};
  return articleMetadata(meta);
}

export default async function PostPage({ params }: { params: Promise<{ name: string }> }) {
  const awaitedParams = await params;
  const decodedName = decodeURIComponent(awaitedParams.name);
  const post = getPost(decodedName);

  if (!post) {
    return <NotFound type="post" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post)) }} />
      <Article post={post} />
    </>
  );
}
