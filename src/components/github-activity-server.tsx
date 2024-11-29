import GHActivityForceNoSSR from "./gh-activity/gh-no-ssr";
import GithubActivityClient from "./gh-activity/gh-activity-heatmap";

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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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
      const level = day.contributionCount === 0 ? 0 : day.contributionCount <= 2 ? 1 : day.contributionCount <= 5 ? 2 : day.contributionCount <= 10 ? 3 : 4;

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

export default async function GithubActivityServer() {
  let calendarData: CalendarData[] = [];
  let error: string | null = null;

  try {
    calendarData = await fetchGithubData();
  } catch (err) {
    error = "Failed to fetch GitHub data";
  }

  if (error) return <div>{error}</div>;
  if (calendarData.length === 0) return <div>No data available</div>;

  return <GHActivityForceNoSSR calendarData={calendarData} />;
}
