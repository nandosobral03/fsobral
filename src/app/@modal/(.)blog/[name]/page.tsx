import ArticleProviders from "@/components/article/article-providers";
import DetailRouteFrame from "@/components/common/detail-route-frame";
import Divider from "@/components/common/divider";
import Footer from "@/app/blog/components/footer";
import NotFound from "@/components/sections/NotFound";
import { blogPosts } from "@/content";
import Article from "@/app/blog/[name]/article";
import { normalizeInterceptedRouteParam } from "@/lib/intercepted-route-param";

export default async function BlogDetailModalPage({
  params,
}: {
  params: Promise<{ name?: string | string[] }>;
}) {
  const resolvedParams = await params;
  const name = normalizeInterceptedRouteParam(resolvedParams.name);
  const post = blogPosts.fromRouteParam(name);

  if (!post) {
    return (
      <DetailRouteFrame label="404">
        <NotFound type="post" />
      </DetailRouteFrame>
    );
  }

  return (
    <DetailRouteFrame label={post.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosts.jsonLd(post)) }} />
      <ArticleProviders>
        <Article post={post} />
        <div className="mx-auto mt-12 max-w-4xl">
          <Divider className="mx-6" />
          <div className="px-6">
            <Footer />
          </div>
        </div>
      </ArticleProviders>
    </DetailRouteFrame>
  );
}
