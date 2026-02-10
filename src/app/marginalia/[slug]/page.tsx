import NotFound from "@/components/sections/NotFound";
import { marginaliaPosts } from "../posts";
import MarginaliaArticle from "./article";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = marginaliaPosts.find((p) => p.slug === decodedSlug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function MarginaliaPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const decodedSlug = decodeURIComponent(awaitedParams.slug);
  const post = marginaliaPosts.find((post) => post.slug === decodedSlug);

  if (!post) {
    return <NotFound type="post" />;
  }

  return <MarginaliaArticle post={post} />;
}
