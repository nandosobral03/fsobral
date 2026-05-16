import { blogPosts, marginaliaPosts } from "@/content/articles";
import { projects } from "@/content/projects";
import type { SitemapContentEntry } from "./sitemap-entry";
export type { SitemapContentEntry } from "./sitemap-entry";

function latestDate(timestamps: readonly number[]) {
  return new Date(Math.max(...timestamps));
}

export function getStaticSitemapEntries(): readonly SitemapContentEntry[] {
  const blogTimestamps = [
    ...blogPosts.visible().map((entry) => entry.dateTimestamp),
    ...marginaliaPosts.visible().map((entry) => entry.dateTimestamp),
  ];
  const projectTimestamps = projects.visible().map((entry) => entry.lastModifiedTimestamp);

  return [
    {
      path: "/",
      lastModified: latestDate([...blogTimestamps, ...projectTimestamps]),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      path: "/projects",
      lastModified: latestDate(projectTimestamps),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      path: "/blog",
      lastModified: latestDate(blogTimestamps),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}

export function getContentSitemapEntries(): readonly SitemapContentEntry[] {
  return [
    ...blogPosts.sitemapEntries(),
    ...projects.sitemapEntries(),
  ];
}

export function getSitemapEntries(): readonly SitemapContentEntry[] {
  return [
    ...getStaticSitemapEntries(),
    ...getContentSitemapEntries(),
  ];
}
