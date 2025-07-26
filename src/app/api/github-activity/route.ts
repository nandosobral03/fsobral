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

async function fetchGithubData(): Promise<CalendarData[]> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "nandosobral03") {
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
  const contributions = data.data.user.contributionsCollection.contributionCalendar;

  const formattedData: CalendarData[] = [];

  contributions.weeks.forEach((week) => {
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

export async function GET() {
  try {
    const calendarData = await fetchGithubData();
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