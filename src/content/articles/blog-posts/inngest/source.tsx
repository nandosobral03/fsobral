import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./inngest"));

export const inngestSource = {
  title: "Inngest: A better way to handle background jobs in serverless",
  description: "Checking out how to use Inngest to solve problems that usually aren't even problems for non-serverless environments (and a small rant about Streak)",
  subtitle: "My experience solving problems that are usually trivial in other developer workflows, also I hate Streak and I want you to hate it too",
  slug: "inngest",
  date: "September 17, 2024",
  coverImage: "/blog/covers/inngest.png",
  tags: ["serverless", "development"],
  Component,
} satisfies ArticleSource;
