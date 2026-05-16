import ArticleShell from "@/components/article/article-shell";
import type { BlogPostEntry } from "@/content";

export default function Article({ post }: { post: BlogPostEntry }) {
  const Component = post.Component;

  return (
    <ArticleShell
      title={post.title}
      description={post.subtitle ?? post.description}
      date={post.date}
      readingTimeMinutes={post.readingTimeMinutes ?? 5}
      tags={post.tags}
      coverImage={post.coverImage}
    >
      <Component />
    </ArticleShell>
  );
}
