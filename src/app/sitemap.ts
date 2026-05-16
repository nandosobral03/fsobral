import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/content";
import { canonicalUrl, getLocalBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getLocalBaseUrl();
  return getSitemapEntries().map((entry) => ({
    url: canonicalUrl(entry.path, base),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
