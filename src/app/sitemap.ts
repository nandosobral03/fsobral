import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";
import { projects } from "./projects/projects";

const getBaseUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const urls: MetadataRoute.Sitemap = [
    {
      url: new URL("/", base).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/projects", base).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: new URL("/blog", base).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  posts
    .filter((p) => !p.hidden)
    .forEach((p) => {
      urls.push({
        url: new URL(`/blog/${p.slug}`, base).toString(),
        lastModified: new Date(p.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

  projects.forEach((proj) => {
    urls.push({
      url: new URL(`/projects/${encodeURIComponent(proj.name)}`, base).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  return urls;
}
