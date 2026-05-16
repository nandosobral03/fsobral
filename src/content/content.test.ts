import { describe, expect, test } from "bun:test";
import {
  blogPosts,
  getContentSitemapEntries,
  getStaticSitemapEntries,
  marginaliaPosts,
  projects,
} from "@/content";

function expectUnique(values: readonly string[]) {
  expect(new Set(values).size).toBe(values.length);
}

function expectNewestFirst(entries: readonly { dateTimestamp: number }[]) {
  for (let index = 1; index < entries.length; index++) {
    expect(entries[index - 1].dateTimestamp).toBeGreaterThanOrEqual(entries[index].dateTimestamp);
  }
}

describe("content collection invariants", () => {
  test("blog posts are normalized and sorted", () => {
    const entries = blogPosts.all();

    expect(entries.length).toBeGreaterThan(0);
    expectUnique(entries.map((entry) => entry.slug));
    expectUnique(entries.map((entry) => entry.path));
    expect(entries.every((entry) => entry.path.startsWith("/blog/"))).toBe(true);
    expect(entries.every((entry) => Number.isFinite(entry.dateTimestamp))).toBe(true);
    expect(entries.every((entry) => !Number.isNaN(Date.parse(entry.dateIso)))).toBe(true);
    expect(blogPosts.visible().every((entry) => !entry.hidden)).toBe(true);
    expectNewestFirst(entries);
  });

  test("marginalia posts are normalized and sorted", () => {
    const entries = marginaliaPosts.all();

    expect(entries.length).toBeGreaterThan(0);
    expectUnique(entries.map((entry) => entry.slug));
    expectUnique(entries.map((entry) => entry.path));
    expect(entries.every((entry) => entry.path.startsWith("/marginalia/"))).toBe(true);
    expect(entries.every((entry) => Number.isFinite(entry.dateTimestamp))).toBe(true);
    expect(marginaliaPosts.visible().every((entry) => !entry.hidden)).toBe(true);
    expectNewestFirst(entries);
  });

  test("projects are normalized and route-addressable", () => {
    const entries = projects.all();

    expect(entries.length).toBeGreaterThan(0);
    expectUnique(entries.map((entry) => entry.slug));
    expectUnique(entries.map((entry) => entry.path));
    expect(entries.every((entry) => entry.path.startsWith("/projects/"))).toBe(true);
    expect(entries.every((entry) => Number.isFinite(entry.lastModifiedTimestamp))).toBe(true);
    expect(entries.every((entry) => !Number.isNaN(Date.parse(entry.lastModifiedIso)))).toBe(true);
    expect(entries.every((entry) => entry.lastModifiedTimestamp >= Date.parse(`${entry.year}-01-01`))).toBe(true);
    expect(projects.visible().every((entry) => !entry.hidden)).toBe(true);
    expect(projects.fromRouteParam(encodeURIComponent("spring'84"))?.name).toBe("spring'84");
  });

  test("project year surfaces own visible project grouping", () => {
    const surfaces = projects.years();
    const surfaceYears = surfaces.map((surface) => surface.year);
    const visiblePaths = projects.visible().map((entry) => entry.path).sort();
    const groupedPaths = surfaces.flatMap((surface) => surface.entries.map((entry) => entry.path)).sort();

    expect(surfaceYears).toEqual([...surfaceYears].sort((a, b) => b - a));
    expect(groupedPaths).toEqual(visiblePaths);
    expect(surfaces.every((surface) => surface.entries.every((entry) => entry.year === surface.year))).toBe(true);
    expect(surfaces.every((surface) => surface.cardEntries.length === surface.entries.length)).toBe(true);
  });
});

describe("content surfaces", () => {
  test("cards expose stable list data", () => {
    const blogCard = blogPosts.cardEntries()[0];
    const projectCard = projects.cardEntries()[0];

    expect(blogCard.title).toBeTruthy();
    expect(blogCard.description).toBeTruthy();
    expect(blogCard.href).toMatch(/^\/blog\//);
    expect(projectCard.title).toBeTruthy();
    expect(projectCard.description).toBeTruthy();
    expect(projectCard.href).toMatch(/^\/projects\//);
    expect(projectCard.image).toBeTruthy();
  });

  test("RSS includes visible blog posts only", () => {
    const rssItems = blogPosts.rssItems();

    expect(rssItems).toHaveLength(blogPosts.visible().length);
    expect(rssItems.every((item) => item.path.startsWith("/blog/"))).toBe(true);
    expect(rssItems.some((item) => item.path.startsWith("/marginalia/"))).toBe(false);
  });

  test("content sitemap includes blog posts and projects but excludes marginalia", () => {
    const paths = getContentSitemapEntries().map((entry) => entry.path);

    expect(paths).toContain(blogPosts.visible()[0].path);
    expect(paths).toContain(projects.visible()[0].path);
    expect(paths.some((path) => path.startsWith("/marginalia/"))).toBe(false);
  });

  test("sitemap dates come from normalized content timestamps", () => {
    const entries = getContentSitemapEntries();
    const blogPost = blogPosts.visible()[0];
    const project = projects.visible()[0];
    const blogSitemapEntry = entries.find((entry) => entry.path === blogPost.path);
    const projectSitemapEntry = entries.find((entry) => entry.path === project.path);

    expect(blogSitemapEntry?.lastModified.getTime()).toBe(blogPost.dateTimestamp);
    expect(projectSitemapEntry?.lastModified.getTime()).toBe(project.lastModifiedTimestamp);
  });

  test("static sitemap dates are derived from normalized content timestamps", () => {
    const entries = getStaticSitemapEntries();
    const blogTimestamps = [
      ...blogPosts.visible().map((entry) => entry.dateTimestamp),
      ...marginaliaPosts.visible().map((entry) => entry.dateTimestamp),
    ];
    const projectTimestamps = projects.visible().map((entry) => entry.lastModifiedTimestamp);
    const rootEntry = entries.find((entry) => entry.path === "/");
    const blogEntry = entries.find((entry) => entry.path === "/blog");
    const projectsEntry = entries.find((entry) => entry.path === "/projects");

    expect(rootEntry?.lastModified.getTime()).toBe(Math.max(...blogTimestamps, ...projectTimestamps));
    expect(blogEntry?.lastModified.getTime()).toBe(Math.max(...blogTimestamps));
    expect(projectsEntry?.lastModified.getTime()).toBe(Math.max(...projectTimestamps));
  });

  test("metadata and JSON-LD derive URLs from normalized collection paths", () => {
    const blogPost = blogPosts.visible()[0];
    const project = projects.visible()[0];
    const blogJsonLd = blogPosts.jsonLd(blogPost) as { url: string };
    const projectJsonLd = projects.jsonLd(project) as { url: string };

    expect(blogPosts.metadata(blogPost).openGraph?.url).toBeUndefined();
    expect(new URL(blogJsonLd.url).pathname).toBe(blogPost.path);
    expect(new URL(projectJsonLd.url).pathname).toBe(project.path);
  });
});
