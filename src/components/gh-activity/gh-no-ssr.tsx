"use client";

import GithubActivityClient from "./gh-activity-heatmap";
import NoSsrWrapper from "../common/no-ssr-wrapper";
import Link from "next/link";

interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

export default function GHActivityForceNoSSR({ calendarData, logins }: { calendarData: CalendarData[]; logins?: string[] }) {
  const fallbackLogins = (process.env.NEXT_PUBLIC_GITHUB_LOGINS || "nandosobral03")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const githubLogins = (logins && logins.length > 0 ? logins : fallbackLogins).map((s) => s.trim()).filter(Boolean);

  return (
    <NoSsrWrapper>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <GithubActivityClient calendarData={calendarData} />
        {githubLogins.length > 0 && (
          <div className="mt-3 text-xs text-gray-500">
            Combined activity of{" "}
            {githubLogins.map((login, idx) => (
              <span key={login}>
                <Link href={`https://github.com/${login}`} target="_blank" className="underline">
                  @{login}
                </Link>
                {idx < githubLogins.length - 1 ? <span>{" · "}</span> : null}
              </span>
            ))}
          </div>
        )}
      </div>
    </NoSsrWrapper>
  );
}
