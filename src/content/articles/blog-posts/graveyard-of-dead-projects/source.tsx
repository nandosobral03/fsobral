import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./graveyard-of-dead-projects"));

export const graveyardOfDeadProjectsSource = {
  title: "The Graveyard of Dead Projects",
  description: "A collection of projects that I've abandoned and the reasons why, so they are not forgotten",
  slug: "graveyard-of-dead-projects",
  date: "January 09, 2025",
  coverImage: "/blog/covers/graveyard-of-dead-projects.png",
  tags: ["projects"],
  Component,
} satisfies ArticleSource;
