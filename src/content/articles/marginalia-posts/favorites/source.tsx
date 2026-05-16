import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./favorites"));

export const favoritesSource = {
  title: "Favorites",
  description: "Web finds and selected prints worth remembering",
  slug: "favorites",
  date: "August 20, 2025",
  tags: [],
  Component,
} satisfies ArticleSource;
