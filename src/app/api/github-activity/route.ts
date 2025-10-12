import { NextResponse } from "next/server";

interface ContributionDay {
  contributionCount: number;
  weekday: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface User {
  contributionsCollection: ContributionsCollection;
}

interface GithubData {
  user: User;
}

interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

async function fetchGithubDataForLogin(login: string): Promise<CalendarData[]> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "${login}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    weekday
                    date
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const data: { data: GithubData } = await response.json();
  const contributions = data.data?.user.contributionsCollection.contributionCalendar;

  const formattedData: CalendarData[] = [];

  contributions?.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const level = day.contributionCount === 0 ? 0 : day.contributionCount === 1 ? 1 : day.contributionCount <= 3 ? 2 : day.contributionCount <= 6 ? 3 : day.contributionCount <= 9 ? 4 : day.contributionCount <= 15 ? 5 : 6;

      formattedData.push({
        date: day.date,
        count: day.contributionCount,
        level: level,
        weekday: day.weekday,
      });
    });
  });

  return formattedData;
}

function levelFromCount(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  if (count <= 9) return 4;
  if (count <= 15) return 5;
  return 6;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryLogins = url.searchParams.get("logins");
    const envLogins = process.env.GITHUB_LOGINS;
    const rawLogins = (queryLogins || envLogins || "nandosobral03")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Fetch contributions for each login
    const allData = await Promise.all(rawLogins.map((login) => fetchGithubDataForLogin(login)));

    // Aggregate by date across all users
    const byDate = new Map<string, { count: number; weekday: number }>();
    for (const data of allData) {
      for (const day of data) {
        const existing = byDate.get(day.date);
        if (existing) {
          existing.count += day.count;
        } else {
          byDate.set(day.date, { count: day.count, weekday: day.weekday });
        }
      }
    }

    // Build final array with levels and stable order by date
    const calendarData: CalendarData[] = Array.from(byDate.entries())
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([date, { count, weekday }]) => ({
        date,
        count,
        level: levelFromCount(count),
        weekday,
      }));

    return NextResponse.json(calendarData, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
