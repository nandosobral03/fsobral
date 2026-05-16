import { defineCollection } from "@/content/core/collection";
import { articleCardEntry } from "@/content/surfaces/cards";
import { articleMetadata } from "@/content/surfaces/metadata";
import { blogPostJsonLd } from "@/content/surfaces/json-ld";
import { articleOgImage } from "@/content/surfaces/og";
import { blogRssItem } from "@/content/surfaces/rss";
import { articleSitemapEntry } from "@/content/surfaces/sitemap-entry";
import type {
  ArticleCollection,
  ArticleSource,
  BlogPostEntry,
  MarginaliaPostEntry,
} from "./article-types";

function validateArticle(entry: BlogPostEntry | MarginaliaPostEntry) {
  if (!entry.description.trim()) {
    throw new Error(`${entry.kind}/${entry.slug} has an empty description`);
  }
}

export function createBlogPostCollection(
  sources: readonly ArticleSource[]
): ArticleCollection<BlogPostEntry> & {
  rssItems(): readonly ReturnType<typeof blogRssItem>[];
  sitemapEntries(): readonly ReturnType<typeof articleSitemapEntry>[];
} {
  const base = defineCollection<ArticleSource, BlogPostEntry>({
    name: "blogPosts",
    basePath: "/blog",
    sources,
    sortByDateDesc: true,
    getTitle: (source) => source.title,
    getSlug: (source) => source.slug,
    getDate: (source) => source.date,
    makeEntry: (source, fields) => ({
      ...source,
      ...fields,
      dateIso: fields.dateIso!,
      dateTimestamp: fields.dateTimestamp!,
      kind: "blog",
    }),
    validateEntry: validateArticle,
  });

  return {
    ...base,
    cardEntries: () => base.visible().map(articleCardEntry),
    metadata: articleMetadata,
    jsonLd: blogPostJsonLd,
    ogImage: articleOgImage,
    rssItems: () => base.visible().map(blogRssItem),
    sitemapEntries: () => base.visible().map(articleSitemapEntry),
  };
}

export function createMarginaliaCollection(
  sources: readonly ArticleSource[]
): ArticleCollection<MarginaliaPostEntry> {
  const base = defineCollection<ArticleSource, MarginaliaPostEntry>({
    name: "marginaliaPosts",
    basePath: "/marginalia",
    sources,
    sortByDateDesc: true,
    getTitle: (source) => source.title,
    getSlug: (source) => source.slug,
    getDate: (source) => source.date,
    makeEntry: (source, fields) => ({
      ...source,
      ...fields,
      dateIso: fields.dateIso!,
      dateTimestamp: fields.dateTimestamp!,
      kind: "marginalia",
    }),
    validateEntry: validateArticle,
  });

  return {
    ...base,
    cardEntries: () => base.visible().map(articleCardEntry),
    metadata: articleMetadata,
    jsonLd: () => null,
    ogImage: articleOgImage,
  };
}
