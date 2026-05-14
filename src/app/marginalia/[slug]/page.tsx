import NotFound from "@/components/sections/NotFound";
import { getMarginaliaPost } from "../posts";
import MarginaliaArticle from "./article";
import { articleMetadata } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = getMarginaliaPost(decodedSlug);
  if (!post) return {};
  return articleMetadata(post);
}

export default async function MarginaliaPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const decodedSlug = decodeURIComponent(awaitedParams.slug);
  const post = getMarginaliaPost(decodedSlug);

  if (!post) {
    return <NotFound type="post" />;
  }

  return <MarginaliaArticle post={post} />;
}
