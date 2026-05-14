"use client";

import ArticleShell from "@/components/article/article-shell";
import type { MarginaliaPost } from "../posts";

export default function MarginaliaArticle({ post }: { post: MarginaliaPost }) {
  return (
    <ArticleShell
      eyebrow="Marginalia"
      title={post.title}
      description={post.description}
      date={post.date}
      tags={post.tags}
    >
      {post.components}
    </ArticleShell>
  );
}
