import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./spring84-spec"));

export const spring84SpecSource = {
  title: "Spring '84 Specification",
  description: "A compact draft specification for small, expressive, self-certifying web boards",
  slug: "spring84-spec",
  date: "May 14, 2026",
  tags: [],
  Component,
} satisfies ArticleSource;
