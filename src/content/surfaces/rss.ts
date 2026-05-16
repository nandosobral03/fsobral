import type { BlogPostEntry } from "@/content/articles/article-types";
import { canonicalUrl, getLocalBaseUrl, site } from "@/lib/site";

export type RssItem = {
  title: string;
  description: string;
  path: string;
  publishedTimestamp: number;
};

export function blogRssItem(entry: BlogPostEntry): RssItem {
  return {
    title: entry.title,
    description: entry.description,
    path: entry.path,
    publishedTimestamp: entry.dateTimestamp,
  };
}

export function renderRssFeed(items: readonly RssItem[], base = getLocalBaseUrl()) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${site.author} - Blog</title>
    <link>${base}</link>
    <description>Articles by Fernando Sobral</description>
    <language>en</language>
    ${items
      .map((item) => {
        const url = canonicalUrl(item.path, base);
        const pubDate = new Date(item.publishedTimestamp).toUTCString();
        return `<item>
          <title><![CDATA[${item.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${item.description}]]></description>
        </item>`;
      })
      .join("\n")}
  </channel>
</rss>`;
}
