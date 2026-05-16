import type { ArticleEntry } from "@/content/articles/article-types";
import type { ProjectEntry } from "@/content/projects/project-types";

export type ArticleCardEntry = {
  title: string;
  description: string;
  date: string;
  href: string;
  coverImage?: string;
  tags?: string[];
};

export type ProjectCardEntry = {
  title: string;
  year: number;
  image: string;
  description: string;
  href: string;
};

export function articleCardEntry(entry: ArticleEntry): ArticleCardEntry {
  return {
    title: entry.title,
    description: entry.description,
    date: entry.date,
    href: entry.path,
    coverImage: entry.coverImage,
    tags: entry.tags,
  };
}

export function projectCardEntry(entry: ProjectEntry): ProjectCardEntry {
  return {
    title: entry.name,
    year: entry.year,
    image: entry.preview.cover,
    description: entry.preview.description,
    href: entry.path,
  };
}
