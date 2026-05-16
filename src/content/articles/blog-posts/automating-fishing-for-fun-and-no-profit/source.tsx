import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./automating-fishing-for-fun-and-no-profit"));

export const automatingFishingForFunAndNoProfitSource = {
  title: "Automating fishing for fun and no profit",
  description: "I decided to automate a fishing game because I wanted to automate something, it was fun",
  slug: "automating-fishing-for-fun-and-no-profit",
  date: "June 22, 2025",
  coverImage: "/blog/covers/automating-fishing-for-fun-and-no-profit.jpeg",
  tags: ["automation", "games"],
  Component,
} satisfies ArticleSource;
