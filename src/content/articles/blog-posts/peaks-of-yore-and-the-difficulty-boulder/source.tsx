import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./peaks-of-yore-and-the-difficulty-boulder"));

export const peaksOfYoreAndTheDifficultyBoulderSource = {
  title: "Peaks of Yore and the Difficulty Boulder",
  description: "A look into one of my favorite games and how it handles difficulty",
  slug: "peaks-of-yore-and-the-difficulty-boulder",
  date: "December 02, 2024",
  coverImage: "/blog/covers/peaks-of-yore-and-the-difficulty-boulder.png",
  tags: ["games"],
  Component,
} satisfies ArticleSource;
