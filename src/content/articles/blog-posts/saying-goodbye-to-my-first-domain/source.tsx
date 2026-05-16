import dynamic from "next/dynamic";
import type { ArticleSource } from "../../article-types";

const Component = dynamic(() => import("./saying-goodbye-to-my-first-domain"));

export const sayingGoodbyeToMyFirstDomainSource = {
  title: "Saying goodbye to my first domain",
  description: "Reflecting on the journey with my first domain and the bittersweet process of moving on, including the technical and emotional lessons learned along the way.",
  slug: "saying-goodbye-to-my-first-domain",
  date: "May 01, 2025",
  coverImage: "/blog/covers/saying-goodbye-to-my-first-domain.png",
  tags: ["learning"],
  Component,
} satisfies ArticleSource;
