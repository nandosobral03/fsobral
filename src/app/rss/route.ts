import { getVisiblePostMetadata } from "../blog/posts-metadata";
import { NextResponse } from "next/server";
import { canonicalUrl, getLocalBaseUrl, site } from "@/lib/site";

export async function GET() {
  const base = getLocalBaseUrl();
  const visible = getVisiblePostMetadata();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${site.author} - Blog</title>
    <link>${base}</link>
    <description>Articles by Fernando Sobral</description>
    <language>en</language>
    ${visible
      .map((p) => {
        const url = canonicalUrl(`/blog/${p.slug}`, base);
        const pubDate = new Date(p.date).toUTCString();
        return `<item>
          <title><![CDATA[${p.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${p.description}]]></description>
        </item>`;
      })
      .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
