"use client";

import ArticleShell from "@/components/article/article-shell";
import type { Post } from "../posts";

export default function Article({ post }: { post: Post }) {
  return (
    <ArticleShell
      title={post.title}
      description={post.subtitle ?? post.description}
      date={post.date}
      readingTimeMinutes={post.readingTimeMinutes ?? 5}
      tags={post.tags}
      coverImage={post.coverImage}
    >
      {post.components}
    </ArticleShell>
  );
}
