import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./e-unibus-infinitum"));

export const eUnibusInfinitumSource = {
  title: "E Unibus Infinitum",
  description: "David Foster Wallace's E Unibus Pluram: was published in 1993, but is more relevant than ever today.",
  slug: "e-unibus-infinitum",
  date: "October 10, 2025",
  coverImage: "/blog/covers/e-unibus-infinitum.png",
  tags: ["media", "culture"],
  Component,
} satisfies ArticleSource;
