import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./tailwind-v4"));

export const tailwindV4Source = {
  title: "Tailwind v4: Releasing a major update in the age of AI",
  description: "I had to write a blog about the new features in Tailwind CSS v4 so I derailed it by going on tangents about the unique challenges of releasing big changes in the age of AI assisted coding.",
  slug: "tailwind-v4",
  date: "March 27, 2025",
  coverImage: "/blog/covers/tailwind-v4.png",
  tags: ["frontend", "development", "ai"],
  Component,
} satisfies ArticleSource;
