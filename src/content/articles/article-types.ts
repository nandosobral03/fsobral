import type { Metadata } from "next";
import type { ComponentType } from "react";
import type { ContentCollection, RoutableEntry } from "@/content/core/collection";
import type { ArticleCardEntry } from "@/content/surfaces/cards";
import type { RssItem } from "@/content/surfaces/rss";
import type { SitemapContentEntry } from "@/content/surfaces/sitemap-entry";
import type { OgImageOptions } from "@/lib/og-image";

export type ArticleSource = {
  title: string;
  description: string;
  slug?: string;
  date: string;
  Component: ComponentType;
  subtitle?: string;
  coverImage?: string;
  hidden?: boolean;
  tags?: string[];
  readingTimeMinutes?: number;
};

export type ArticleEntry = ArticleSource &
  RoutableEntry & {
    dateIso: string;
    dateTimestamp: number;
    kind: "blog" | "marginalia";
  };

export type BlogPostEntry = ArticleEntry & {
  kind: "blog";
};

export type MarginaliaPostEntry = ArticleEntry & {
  kind: "marginalia";
};

export type ArticleCollection<TEntry extends ArticleEntry> = ContentCollection<TEntry> & {
  cardEntries(): readonly ArticleCardEntry[];
  metadata(entry: TEntry): Metadata;
  jsonLd(entry: TEntry): object | null;
  ogImage(entry: TEntry | undefined, fallbackTitle: string): OgImageOptions;
  rssItems?: () => readonly RssItem[];
  sitemapEntries?: () => readonly SitemapContentEntry[];
};
