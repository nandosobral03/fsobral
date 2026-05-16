import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./changelog"));

export const changelogSource = {
  title: "Changelog",
  description: "A high-level overview of updates to this site",
  slug: "changelog",
  date: "March 28, 2026",
  tags: [],
  Component,
} satisfies ArticleSource;
