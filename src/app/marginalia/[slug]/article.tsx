import ArticleShell from "@/components/article/article-shell";
import type { MarginaliaPostEntry } from "@/content";

export default function MarginaliaArticle({ post }: { post: MarginaliaPostEntry }) {
  const Component = post.Component;

  return (
    <ArticleShell
      eyebrow="Marginalia"
      title={post.title}
      description={post.description}
      date={post.date}
      tags={post.tags}
    >
      <Component />
    </ArticleShell>
  );
}
