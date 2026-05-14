import { getAggregatedGithubCalendar, parseGithubLogins } from "@/lib/github-activity";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryLogins = url.searchParams.get("logins");
    const rawLogins = parseGithubLogins(queryLogins || process.env.GITHUB_LOGINS);
    const data = await getAggregatedGithubCalendar(rawLogins);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
