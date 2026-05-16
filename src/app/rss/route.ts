import { NextResponse } from "next/server";
import { blogPosts } from "@/content";
import { renderRssFeed } from "@/content/surfaces/rss";
import { getLocalBaseUrl } from "@/lib/site";

export async function GET() {
  const base = getLocalBaseUrl();
  const rss = renderRssFeed(blogPosts.rssItems(), base);

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
