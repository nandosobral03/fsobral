import { describe, expect, test } from "bun:test";
import { blogPosts, projects } from "@/content";
import sitemap from "./sitemap";

describe("app sitemap", () => {
  test("combines static and content pages", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(paths).toContain("/");
    expect(paths).toContain("/blog");
    expect(paths).toContain("/projects");
    expect(paths).toContain(blogPosts.visible()[0].path);
    expect(paths).toContain(projects.visible()[0].path);
  });
});
