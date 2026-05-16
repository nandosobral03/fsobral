import type { Metadata } from "next";
import type { ArticleEntry } from "@/content/articles/article-types";
import type { ProjectEntry } from "@/content/projects/project-types";

export function articleMetadata(entry: ArticleEntry): Metadata {
  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.description,
      publishedTime: entry.dateIso,
      tags: entry.tags,
      ...(entry.coverImage ? { images: [{ url: entry.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

export function projectMetadata(entry: ProjectEntry): Metadata {
  return {
    title: entry.name,
    description: entry.preview.description,
    openGraph: {
      type: "website",
      title: entry.name,
      description: entry.preview.description,
      images: [{ url: entry.preview.cover }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.name,
      description: entry.preview.description,
    },
  };
}
