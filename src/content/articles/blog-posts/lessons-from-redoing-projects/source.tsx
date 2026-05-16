import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./lessons-from-redoing-projects"));

export const lessonsFromRedoingProjectsSource = {
  title: "Lessons learned from redoing the same project over the years",
  description: "A look at my different iterations of the same project, why I've done it so many times, and what I've learned from it.",
  subtitle: "A nostalgic journey through my various iterations of the same project",
  slug: "lessons-from-redoing-projects",
  date: "June 23, 2024",
  coverImage: "/blog/covers/lessons-from-redoing-projects.png",
  tags: ["development", "learning"],
  Component,
} satisfies ArticleSource;
