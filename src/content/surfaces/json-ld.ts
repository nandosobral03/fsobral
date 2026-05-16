import type { BlogPostEntry } from "@/content/articles/article-types";
import type { ProjectEntry } from "@/content/projects/project-types";
import { canonicalUrl, getBaseUrl, site } from "@/lib/site";

export function blogPostJsonLd(entry: BlogPostEntry, base = getBaseUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.dateIso,
    author: { "@type": "Person", name: site.author },
    url: canonicalUrl(entry.path, base),
    ...(entry.coverImage ? { image: canonicalUrl(entry.coverImage, base) } : {}),
    ...(entry.tags ? { keywords: entry.tags.join(", ") } : {}),
  };
}

export function projectJsonLd(entry: ProjectEntry, base = getBaseUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: entry.name,
    description: entry.preview.description,
    url: canonicalUrl(entry.path, base),
    image: canonicalUrl(entry.preview.cover, base),
    author: { "@type": "Person", name: site.author },
  };
}
