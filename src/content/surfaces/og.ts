import type { ArticleEntry } from "@/content/articles/article-types";
import type { ProjectEntry } from "@/content/projects/project-types";
import type { OgImageOptions } from "@/lib/og-image";

export function articleOgImage(
  entry: ArticleEntry | undefined,
  fallbackTitle: string
): OgImageOptions {
  return {
    title: entry?.title ?? fallbackTitle,
    subtitle: entry?.subtitle ?? entry?.description ?? "",
  };
}

export function projectOgImage(
  entry: ProjectEntry | undefined,
  fallbackTitle: string
): OgImageOptions {
  return {
    title: entry?.name ?? fallbackTitle,
    subtitle: entry?.preview.description ?? "",
  };
}
