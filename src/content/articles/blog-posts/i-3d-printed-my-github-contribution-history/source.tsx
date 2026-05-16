import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./i-3d-printed-my-github-contribution-history"));

export const i3dPrintedMyGithubContributionHistorySource = {
  title: "I 3D printed my Github contribution history",
  description: "A memento of a year's worth of coding efforts, both during and outside of work.",
  slug: "i-3d-printed-my-github-contribution-history",
  date: "March 13, 2025",
  coverImage: "/blog/covers/i-3d-printed-my-github-contribution-history.png",
  tags: ["career", "reflection"],
  Component,
} satisfies ArticleSource;
