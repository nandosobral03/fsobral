"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GithubActivityClient from "./gh-activity-heatmap";

interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

export default function GithubActivityClientWrapper() {
  const [calendarData, setCalendarData] = useState<CalendarData[]>([]);
  const [totalLastYear, setTotalLastYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Resolve GitHub logins from public env var so we can link to profiles
  const githubLogins = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_GITHUB_LOGINS || "nandosobral03";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, []);

  // Track breathing animation start time to reveal at the next dark peak
  const breathingStartTimeRef = useRef<number | null>(null);
  const breathingCycleDurationMs = 2400; // 0% -> 50% (dark) -> 100% cycle

  useEffect(() => {
    // Initialize breathing cycle start time on mount
    if (breathingStartTimeRef.current === null) {
      breathingStartTimeRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();
    }

    async function fetchData() {
      try {
        const qs = new URLSearchParams({
          logins: githubLogins.join(","),
        }).toString();
        const response = await fetch(`/api/github-activity?${qs}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCalendarData(data.days);
        setTotalLastYear(data.totalLastYear);
      } catch (err) {
        setError("Failed to load GitHub activity");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [githubLogins]);

  // When data is ready, keep breathing until the next dark peak, then reveal the heatmap
  useEffect(() => {
    if (loading) return;
    if (error) return;
    if (calendarData.length === 0) return;
    if (showHeatmap) return;

    const startTime = breathingStartTimeRef.current ?? (typeof performance !== "undefined" ? performance.now() : Date.now());
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const elapsed = Math.max(0, now - startTime);
    const cycle = breathingCycleDurationMs;
    const positionInCycle = elapsed % cycle; // 0..cycle
    const darkPeakAt = cycle * 0.5; // 50%
    let msUntilDarkPeak = darkPeakAt - positionInCycle;
    if (msUntilDarkPeak < 0) msUntilDarkPeak += cycle;

    // If we're very close to peak, reveal immediately
    if (msUntilDarkPeak < 16) msUntilDarkPeak = 0;

    const timeoutId = setTimeout(() => {
      setShowHeatmap(true);
    }, msUntilDarkPeak);

    return () => clearTimeout(timeoutId);
  }, [loading, error, calendarData, showHeatmap]);

  // If loading finished and there's an error or no data, show the message immediately
  if (!loading && (error || calendarData.length === 0)) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-foreground/50">
        <span className="material-symbols-outlined text-3xl">cloud_off</span>
        <p className="text-sm font-condensed uppercase tracking-wider">{error || "Error loading GitHub activity data"}</p>
      </div>
    );
  }

  const renderSkeletonGrid = (weekCount: number) => (
    <div className="flex flex-col w-full">
      <div className="hidden md:flex w-full mb-1 h-4" />
      <div className="flex gap-[2px] relative flex-col md:flex-row w-full">
        {Array.from({ length: weekCount }, (_, weekIndex) => (
          <div key={weekIndex} className="flex flex-row md:flex-col gap-[2px] flex-1">
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="aspect-square rounded-none gh-skeleton-cell"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <a href={`https://github.com/${githubLogins[0]}`} target="_blank" rel="noopener noreferrer" className="meta-label text-background/40 hover:text-accent transition-colors duration-300">
            @{githubLogins[0]} — github activity
          </a>
          {showHeatmap && totalLastYear !== null ? (
            <span className="meta-label text-background/40">
              <span className="text-accent/70">{totalLastYear.toLocaleString()}</span> contributions in the last year
            </span>
          ) : (
            <span className="meta-label text-background/40 invisible">0 contributions in the last year</span>
          )}
        </div>
        {showHeatmap ? (
          <GithubActivityClient calendarData={calendarData} startFromDark fillEmpty />
        ) : (
          <>
            <div className="block sm:hidden w-full">{renderSkeletonGrid(26)}</div>
            <div className="hidden sm:block md:hidden w-full">{renderSkeletonGrid(52)}</div>
            <div className="hidden md:block lg:hidden w-full">{renderSkeletonGrid(72)}</div>
            <div className="hidden lg:block xl:hidden w-full">{renderSkeletonGrid(90)}</div>
            <div className="hidden xl:block 2xl:hidden w-full">{renderSkeletonGrid(78)}</div>
            <div className="hidden 2xl:block w-full">{renderSkeletonGrid(104)}</div>
          </>
        )}
      </div>

      <style>{`
        @keyframes gh-breathing {
          0%, 100% { background-color: #1d1d1d; }
          50% { background-color: #2a2927; }
        }
        .gh-skeleton-cell { background-color: #1d1d1d; animation: gh-breathing ${breathingCycleDurationMs}ms ease-in-out infinite; }
        .gh-skeleton-cell-paused { animation: none !important; background-color: #1d1d1d !important; }
      `}</style>
    </div>
  );
}
