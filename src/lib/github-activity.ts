export interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

interface ContributionDay {
  contributionCount: number;
  weekday: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GithubData {
  user?: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: ContributionWeek[];
      };
    };
  };
}

export function parseGithubLogins(value: string | null | undefined, fallback = "nandosobral03") {
  return (value || fallback)
    .split(",")
    .map((login) => login.trim())
    .filter(Boolean);
}

export function levelFromCount(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  if (count <= 9) return 4;
  if (count <= 15) return 5;
  return 6;
}

async function fetchGithubContributions(login: string, from: string, to: string): Promise<{ days: CalendarData[]; total: number }> {
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

  const data: { data?: GithubData } = await response.json();
  const contributions = data.data?.user?.contributionsCollection.contributionCalendar;

  return {
    days:
      contributions?.weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levelFromCount(day.contributionCount),
          weekday: day.weekday,
        }))
      ) ?? [],
    total: contributions?.totalContributions ?? 0,
  };
}

async function fetchGithubDataForLogin(login: string, now = new Date()): Promise<{ days: CalendarData[]; totalLastYear: number }> {
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const twoYearsAgo = new Date(now);
  twoYearsAgo.setFullYear(now.getFullYear() - 2);

  const [recent, older] = await Promise.all([
    fetchGithubContributions(login, oneYearAgo.toISOString(), now.toISOString()),
    fetchGithubContributions(login, twoYearsAgo.toISOString(), oneYearAgo.toISOString()),
  ]);

  const byDate = new Map<string, CalendarData>();
  for (const day of [...older.days, ...recent.days]) {
    byDate.set(day.date, day);
  }

  return {
    days: Array.from(byDate.values()).sort((a, b) => (a.date < b.date ? -1 : 1)),
    totalLastYear: recent.total,
  };
}

export async function getAggregatedGithubCalendar(logins: string[], now = new Date()) {
  const allData = await Promise.all(logins.map((login) => fetchGithubDataForLogin(login, now)));
  const byDate = new Map<string, { count: number; weekday: number }>();
  let totalLastYear = 0;

  for (const { days, totalLastYear: total } of allData) {
    totalLastYear += total;
    for (const day of days) {
      const existing = byDate.get(day.date);
      if (existing) {
        existing.count += day.count;
      } else {
        byDate.set(day.date, { count: day.count, weekday: day.weekday });
      }
    }
  }

  const days: CalendarData[] = Array.from(byDate.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([date, { count, weekday }]) => ({ date, count, level: levelFromCount(count), weekday }));

  return { days, totalLastYear };
}
