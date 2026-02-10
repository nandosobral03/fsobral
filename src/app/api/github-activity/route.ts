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

async function fetchGithubContributions(login: string, from?: string, to?: string): Promise<{ days: CalendarData[]; total: number }> {
  const dateArgs = from ? `(from: "${from}"${to ? `, to: "${to}"` : ""})` : "";
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
            contributionsCollection${dateArgs} {
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
      formattedData.push({
        date: day.date,
        count: day.contributionCount,
        level: levelFromCount(day.contributionCount),
        weekday: day.weekday,
      });
    });
  });

  return { days: formattedData, total: contributions?.totalContributions ?? 0 };
}

async function fetchGithubDataForLogin(login: string): Promise<{ days: CalendarData[]; totalLastYear: number }> {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const twoYearsAgo = new Date(now);
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  const [currentYear, previousYear] = await Promise.all([
    fetchGithubContributions(login),
    fetchGithubContributions(login, twoYearsAgo.toISOString(), oneYearAgo.toISOString()),
  ]);

  // Merge and deduplicate by date (current year takes priority)
  const byDate = new Map<string, CalendarData>();
  for (const day of previousYear.days) byDate.set(day.date, day);
  for (const day of currentYear.days) byDate.set(day.date, day);

  return {
    days: Array.from(byDate.values()).sort((a, b) => (a.date < b.date ? -1 : 1)),
    totalLastYear: currentYear.total,
  };
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
    let totalLastYear = 0;
    for (const { days, totalLastYear: t } of allData) {
      totalLastYear += t;
      for (const day of days) {
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

    return NextResponse.json({ days: calendarData, totalLastYear }, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
