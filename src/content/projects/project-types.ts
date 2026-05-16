import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { ContentCollection, RoutableEntry } from "@/content/core/collection";
import type { ProjectCardEntry } from "@/content/surfaces/cards";
import type { SitemapContentEntry } from "@/content/surfaces/sitemap-entry";
import type { OgImageOptions } from "@/lib/og-image";

export type ProjectYearSide = "left" | "right";

export type ProjectSource = {
  name: string;
  slug?: string;
  path?: string;
  hidden?: boolean;
  updatedAt: string;
  links: { url: string; name: string }[];
  year: number;
  preview: {
    cover: string;
    description: string;
  };
  sections: {
    title: string;
    component: ReactNode | string;
  }[];
  images?: {
    url: string;
    alt: string;
    isMobile?: boolean;
  }[];
};

export type ProjectEntry = Omit<ProjectSource, "slug" | "path"> &
  RoutableEntry & {
    lastModifiedIso: string;
    lastModifiedTimestamp: number;
  };

export type ProjectYearContentSource = {
  year: number;
  side?: ProjectYearSide;
  preface: ReactNode;
};

export type ProjectYearContentSurface = {
  year: number;
  side: ProjectYearSide;
  preface: ReactNode;
  entries: readonly ProjectEntry[];
  cardEntries: readonly ProjectCardEntry[];
};

export type ProjectCollection = ContentCollection<ProjectEntry> & {
  years(): readonly ProjectYearContentSurface[];
  cardEntries(entries?: readonly ProjectEntry[]): readonly ProjectCardEntry[];
  metadata(entry: ProjectEntry): Metadata;
  jsonLd(entry: ProjectEntry): object;
  ogImage(entry: ProjectEntry | undefined, fallbackTitle: string): OgImageOptions;
  sitemapEntries(): readonly SitemapContentEntry[];
};
