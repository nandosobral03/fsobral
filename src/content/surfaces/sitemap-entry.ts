import type { MetadataRoute } from "next";

export type SitemapContentEntry = {
  path: string;
  lastModified: Date;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export function articleSitemapEntry(entry: { path: string; dateTimestamp: number }): SitemapContentEntry {
  return {
    path: entry.path,
    lastModified: new Date(entry.dateTimestamp),
    changeFrequency: "monthly",
    priority: 0.6,
  };
}

export function projectSitemapEntry(entry: { path: string; lastModifiedTimestamp: number }): SitemapContentEntry {
  return {
    path: entry.path,
    lastModified: new Date(entry.lastModifiedTimestamp),
    changeFrequency: "yearly",
    priority: 0.5,
  };
}
