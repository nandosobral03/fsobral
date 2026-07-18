import { getCachedAggregatedGithubCalendar, parseGithubLogins, type CalendarData } from "@/lib/github-activity";
import GHActivityForceNoSSR from "./gh-no-ssr";

export default async function GithubActivityServer({ vertical = false }: { vertical?: boolean } = {}) {
  const logins = parseGithubLogins(process.env.GITHUB_LOGINS || process.env.NEXT_PUBLIC_GITHUB_LOGINS);
  let days: CalendarData[] = [];

  try {
    days = (await getCachedAggregatedGithubCalendar(logins)).days;
  } catch {
    return null;
  }

  if (days.length === 0) return <div>No data available</div>;

  return <GHActivityForceNoSSR calendarData={days} logins={logins} vertical={vertical} />;
}
