import GHActivityForceNoSSR from "./gh-no-ssr";

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

async function fetchContributionsForRange(login: string, from: string, to: string): Promise<CalendarData[]> {
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
            contributionsCollection(from: "${from}", to: "${to}") {
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

  return contributions.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelFromCount(day.contributionCount),
      weekday: day.weekday,
    }))
  );
}

async function fetchGithubDataForLogin(login: string): Promise<CalendarData[]> {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const twoYearsAgo = new Date(now);
  twoYearsAgo.setFullYear(now.getFullYear() - 2);

  const [recent, older] = await Promise.all([
    fetchContributionsForRange(login, oneYearAgo.toISOString(), now.toISOString()),
    fetchContributionsForRange(login, twoYearsAgo.toISOString(), oneYearAgo.toISOString()),
  ]);

  const byDate = new Map<string, CalendarData>();
  for (const day of [...older, ...recent]) {
    byDate.set(day.date, day);
  }
  return Array.from(byDate.values()).sort((a, b) => (a.date < b.date ? -1 : 1));
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

export default async function GithubActivityServer() {
  let calendarData: CalendarData[] = [];
  let error: string | null = null;

  try {
    const rawLogins = (process.env.GITHUB_LOGINS || process.env.NEXT_PUBLIC_GITHUB_LOGINS || "nandosobral03")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const allData = await Promise.all(rawLogins.map((login) => fetchGithubDataForLogin(login)));

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

    calendarData = Array.from(byDate.entries())
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([date, { count, weekday }]) => ({ date, count, level: levelFromCount(count), weekday }));
  } catch {
    error = "Failed to fetch GitHub data";
  }

  if (error) return null;
  if (calendarData.length === 0) return <div>No data available</div>;

  const rawLogins = (process.env.GITHUB_LOGINS || process.env.NEXT_PUBLIC_GITHUB_LOGINS || "nandosobral03")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return <GHActivityForceNoSSR calendarData={calendarData} logins={rawLogins} />;
}
