import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./spring84"));

export const spring84Source = {
  title: "Specifying Spring '84",
  description: "A follow-up to my Spring '83 implementation: specifying a small successor protocol for expressive, self-certifying web boards.",
  subtitle: "A friendly critique, a second pass, and a tiny protocol one year later",
  slug: "spring84",
  date: "May 14, 2026",
  coverImage: "/blog/covers/spring84.png",
  tags: ["protocols", "projects", "web"],
  readingTimeMinutes: 9,
  Component,
} satisfies ArticleSource;
