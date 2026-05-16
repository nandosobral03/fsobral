import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./the-end-less-media-epidemic"));

export const theEndlessMediaEpidemicSource = {
  title: "The Endless Media Epidemic",
  description: "An examination of how we've become so complacent with our media consumption and how it's affecting us",
  slug: "the-endless-media-epidemic",
  date: "February 20, 2025",
  coverImage: "/blog/covers/the-endless-media-epidemic.png",
  tags: ["media", "culture"],
  Component,
} satisfies ArticleSource;
