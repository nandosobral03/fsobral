import ArticleProviders from "@/components/article/article-providers";
import NotFound from "@/components/sections/NotFound";
import { marginaliaPosts } from "@/content";
import MarginaliaArticle from "@/app/marginalia/[slug]/article";
import MarginaliaModalFrame from "./modal-frame";

export default async function MarginaliaModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = marginaliaPosts.fromRouteParam(slug);

  if (!post) {
    return (
      <MarginaliaModalFrame>
        <NotFound type="post" />
      </MarginaliaModalFrame>
    );
  }

  return (
    <MarginaliaModalFrame>
      <ArticleProviders>
        <MarginaliaArticle post={post} />
      </ArticleProviders>
    </MarginaliaModalFrame>
  );
}
