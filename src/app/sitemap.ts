import type { MetadataRoute } from "next";
import { projects } from "./projects/projects";
import { getVisiblePostMetadata } from "./blog/posts-metadata";
import { canonicalUrl, getLocalBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getLocalBaseUrl();
  const urls: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl("/", base),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: canonicalUrl("/projects", base),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: canonicalUrl("/blog", base),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  getVisiblePostMetadata().forEach((p) => {
    urls.push({
      url: canonicalUrl(`/blog/${p.slug}`, base),
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  projects.forEach((proj) => {
    urls.push({
      url: canonicalUrl(proj.path ?? `/projects/${encodeURIComponent(proj.name)}`, base),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  return urls;
}
