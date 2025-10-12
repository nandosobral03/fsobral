"use client";

import Link from "next/link";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isSkeletonFading, setIsSkeletonFading] = useState(false);
  const [skeletonVisible, setSkeletonVisible] = useState(true);

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
      breathingStartTimeRef.current =
        typeof performance !== "undefined" ? performance.now() : Date.now();
    }

    async function fetchData() {
      try {
        const qs = new URLSearchParams({
          logins: githubLogins.join(","),
        }).toString();
        const response = await fetch(`/api/github-activity?${qs}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCalendarData(data);
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

    const startTime =
      breathingStartTimeRef.current ??
      (typeof performance !== "undefined" ? performance.now() : Date.now());
    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const elapsed = Math.max(0, now - startTime);
    const cycle = breathingCycleDurationMs;
    const positionInCycle = elapsed % cycle; // 0..cycle
    const darkPeakAt = cycle * 0.5; // 50%
    let msUntilDarkPeak = darkPeakAt - positionInCycle;
    if (msUntilDarkPeak < 0) msUntilDarkPeak += cycle;

    // If we're very close to peak, reveal immediately
    if (msUntilDarkPeak < 16) msUntilDarkPeak = 0;

    const timeoutId = setTimeout(() => {
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => {
          // Pause skeleton at dark and reveal in the same frame
          setIsSkeletonFading(true);
          setShowHeatmap(true);
        });
      } else {
        setIsSkeletonFading(true);
        setShowHeatmap(true);
      }
    }, msUntilDarkPeak);

    return () => clearTimeout(timeoutId);
  }, [loading, error, calendarData, showHeatmap]);

  // When heatmap becomes visible, fade out the skeleton overlay to avoid a visual jump
  useEffect(() => {
    if (!showHeatmap) return;
    setIsSkeletonFading(true);
    const id = setTimeout(() => setSkeletonVisible(false), 420);
    return () => clearTimeout(id);
  }, [showHeatmap]);

  // If loading finished and there's an error or no data, show the message immediately
  if (!loading && (error || calendarData.length === 0)) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        {error || "Error loading GitHub activity data :("}
      </div>
    );
  }

  if (!showHeatmap) {
    const renderSkeletonGrid = (weekCount: number, sizeClass: string) => (
      <div className="flex gap-1 relative flex-col md:flex-row">
        {Array.from({ length: weekCount }, (_, weekIndex) => (
          <div key={weekIndex} className="flex flex-row md:flex-col gap-1">
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`${sizeClass} rounded-sm gh-skeleton-cell ${
                  isSkeletonFading ? "gh-skeleton-cell-paused" : ""
                }`}
                style={{ backgroundColor: "#bfbbb0" }}
              />
            ))}
          </div>
        ))}
      </div>
    );

    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        {/* Mobile: 20 weeks */}
        <div className="block sm:hidden">
          {renderSkeletonGrid(20, "w-[10px] h-[10px]")}
        </div>

        {/* Tablet: 16 weeks */}
        <div className="hidden sm:block md:hidden">
          {renderSkeletonGrid(16, "w-[12px] h-[12px]")}
        </div>

        {/* Tablet: 25 weeks */}
        <div className="hidden md:block lg:hidden">
          {renderSkeletonGrid(25, "w-[12px] h-[12px]")}
        </div>

        {/* Desktop: 28 weeks */}
        <div className="hidden lg:block xl:hidden">
          {renderSkeletonGrid(28, "w-[14px] h-[14px]")}
        </div>

        {/* Large desktop: 32 weeks */}
        <div className="hidden xl:block 2xl:hidden">
          {renderSkeletonGrid(32, "w-[16px] h-[16px]")}
        </div>

        {/* Large desktop: 40 weeks */}
        <div className="hidden 2xl:block">
          {renderSkeletonGrid(40, "w-[16px] h-[16px]")}
        </div>

        {/* Local keyframes for breathing animation (global to ensure it works outside Next.js styled-jsx) */}
        <style>{`
          @keyframes gh-breathing {
            0% { background-color: #bfbbb0; }
            50% { background-color: #1a1917; }
            100% { background-color: #bfbbb0; }
          }
          .gh-skeleton-cell { animation: gh-breathing ${breathingCycleDurationMs}ms ease-in-out infinite; }
          .gh-skeleton-cell-paused { animation: none !important; background-color: #1a1917 !important; }
        `}</style>
      </div>
    );
  }

  // Render heatmap with an overlayed skeleton that fades out to avoid any visual jump
  const renderSkeletonGrid = (weekCount: number, sizeClass: string) => (
    <div className="flex gap-1 relative flex-col md:flex-row">
      {Array.from({ length: weekCount }, (_, weekIndex) => (
        <div key={weekIndex} className="flex flex-row md:flex-col gap-1">
          {Array.from({ length: 7 }, (_, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`${sizeClass} rounded-sm gh-skeleton-cell ${
                isSkeletonFading ? "gh-skeleton-cell-paused" : ""
              }`}
              style={{ backgroundColor: "#bfbbb0" }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full h-full">
      {/* Always mount heatmap to avoid layout swaps; forceDark keeps it fully dark under skeleton */}
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <GithubActivityClient
          calendarData={calendarData}
          startFromDark
          forceDark={!isSkeletonFading && skeletonVisible}
          fillEmpty
          disableTooltips
        />
        {/* Profile links */}
        <div className="mt-3 text-xs text-gray-500 absolute bottom-0 left-0">
          Combined activity of{" "}
          {githubLogins.map((login, idx) => (
            <span key={login}>
              <Link
                href={`https://github.com/${login}`}
                target="_blank"
                className="underline"
              >
                @{login}
              </Link>
              {idx < githubLogins.length - 1 ? <span>{" · "}</span> : null}
            </span>
          ))}
        </div>
      </div>
      {skeletonVisible && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none ${
            isSkeletonFading ? "opacity-0" : "opacity-100"
          }`}
          style={{ transition: "opacity 350ms ease" }}
        >
          {/* Mobile: 20 weeks */}
          <div className="block sm:hidden">
            {renderSkeletonGrid(20, "w-[10px] h-[10px]")}
          </div>

          {/* Tablet: 16 weeks */}
          <div className="hidden sm:block md:hidden">
            {renderSkeletonGrid(16, "w-[12px] h-[12px]")}
          </div>

          {/* Tablet: 25 weeks */}
          <div className="hidden md:block lg:hidden">
            {renderSkeletonGrid(25, "w-[12px] h-[12px]")}
          </div>

          {/* Desktop: 28 weeks */}
          <div className="hidden lg:block xl:hidden">
            {renderSkeletonGrid(28, "w-[14px] h-[14px]")}
          </div>

          {/* Large desktop: 32 weeks */}
          <div className="hidden xl:block 2xl:hidden">
            {renderSkeletonGrid(32, "w-[16px] h-[16px]")}
          </div>

          {/* Large desktop: 40 weeks */}
          <div className="hidden 2xl:block">
            {renderSkeletonGrid(40, "w-[16px] h-[16px]")}
          </div>

          {/* Keyframes and paused class ensure no perceptible jump at reveal */}
          <style>{`
            @keyframes gh-breathing {
              0% { background-color: #bfbbb0; }
              50% { background-color: #1a1917; }
              100% { background-color: #bfbbb0; }
            }
            .gh-skeleton-cell { animation: gh-breathing ${breathingCycleDurationMs}ms ease-in-out infinite; }
            .gh-skeleton-cell-paused { animation: none !important; background-color: #1a1917 !important; }
          `}</style>
        </div>
      )}
    </div>
  );
}
