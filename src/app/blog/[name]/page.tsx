import NotFound from "@/components/sections/NotFound";
import { posts } from "../posts";
import { postsMetadata } from "../posts-metadata";
import Article from "./article";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fsobral.com";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const slug = decodeURIComponent(name);
  const meta = postsMetadata.find((p) => p.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      publishedTime: new Date(meta.date).toISOString(),
      tags: meta.tags,
      ...(meta.coverImage ? { images: [{ url: meta.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ name: string }> }) {
  const awaitedParams = await params;
  const decodedName = decodeURIComponent(awaitedParams.name);
  const post = posts.find((post) => post.slug === decodedName);

  if (!post) {
    return <NotFound type="post" />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: "Fernando Sobral" },
    url: `${siteUrl}/blog/${post.slug}`,
    ...(post.coverImage ? { image: `${siteUrl}${post.coverImage}` } : {}),
    ...(post.tags ? { keywords: post.tags.join(", ") } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Article post={post} />
    </>
  );
}
