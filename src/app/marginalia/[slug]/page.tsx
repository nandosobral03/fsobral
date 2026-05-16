import NotFound from "@/components/sections/NotFound";
import { marginaliaPosts } from "@/content";
import MarginaliaArticle from "./article";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = marginaliaPosts.fromRouteParam(slug);
  if (!post) return {};
  return marginaliaPosts.metadata(post);
}

export default async function MarginaliaPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const post = marginaliaPosts.fromRouteParam(awaitedParams.slug);

  if (!post) {
    return <NotFound type="post" />;
  }

  return <MarginaliaArticle post={post} />;
}
