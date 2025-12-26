import NotFound from "@/components/sections/NotFound";
import { marginaliaPosts } from "../posts";
import MarginaliaArticle from "./article";

export default async function MarginaliaPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const decodedSlug = decodeURIComponent(awaitedParams.slug);
  const post = marginaliaPosts.find((post) => post.slug === decodedSlug);

  if (!post) {
    return <NotFound type="post" />;
  }

  return <MarginaliaArticle post={post} />;
}
