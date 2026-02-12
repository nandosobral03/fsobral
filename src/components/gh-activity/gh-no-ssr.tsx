"use client";

import { useEffect, useState } from "react";
import GithubActivityClient from "./gh-activity-heatmap";
import Link from "next/link";
import { env } from "process";

interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

export default function GHActivityForceNoSSR({ calendarData, logins }: { calendarData: CalendarData[]; logins?: string[] }) {
  const fallbackLogins = (env.NEXT_PUBLIC_GITHUB_LOGINS || "nandosobral03,fernando-keeper")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const githubLogins = (logins && logins.length > 0 ? logins : fallbackLogins).map((s) => s.trim()).filter(Boolean);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const oneYearAgoStr = oneYearAgo.toISOString().slice(0, 10);
  const totalContributions = calendarData
    .filter((d) => d.date >= oneYearAgoStr)
    .reduce((sum, d) => sum + d.count, 0);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      {githubLogins.length > 0 && (
        <div
          className="w-full flex items-baseline justify-between mb-1 font-mono"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
        >
          <div className="text-xs text-background/40">
            {githubLogins.map((login, idx) => (
              <span key={login}>
                <Link href={`https://github.com/${login}`} target="_blank" className="underline hover:text-background/60">
                  @{login}
                </Link>
                {idx < githubLogins.length - 1 ? <span>{" · "}</span> : null}
              </span>
            ))}
          </div>
          <div className="text-xs text-background/40">
            <span className="font-bold text-background/70">{totalContributions.toLocaleString()}</span>{" "}
            contributions in the last year
          </div>
        </div>
      )}
      <GithubActivityClient calendarData={calendarData} startFromDark />
    </div>
  );
}
