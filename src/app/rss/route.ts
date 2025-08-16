import { posts } from "../blog/posts";
import { NextResponse } from "next/server";

const getBaseUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET() {
  const base = getBaseUrl();
  const visible = posts.filter((p) => !p.hidden);

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Fernando Sobral — Blog</title>
    <link>${base}</link>
    <description>Articles by Fernando Sobral</description>
    <language>en</language>
    ${visible
      .map((p) => {
        const url = `${base}/blog/${p.slug}`;
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
