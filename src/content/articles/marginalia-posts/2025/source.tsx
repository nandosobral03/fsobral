import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./2025"));

export const twentyTwentyFiveSource = {
  title: "2025",
  description: "A short look back at the year",
  slug: "2025",
  date: "December 26, 2025",
  tags: [],
  Component,
} satisfies ArticleSource;
