"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/github-activity");
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
  }, []);

  if (loading) {
    const renderSkeletonGrid = (weekCount: number, sizeClass: string) => (
      <div className="flex gap-1 relative flex-col md:flex-row">
        {Array.from({ length: weekCount }, (_, weekIndex) => (
          <div key={weekIndex} className="flex flex-row md:flex-col gap-1">
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div key={`${weekIndex}-${dayIndex}`} className={`${sizeClass} rounded-sm bg-gray-300`} />
            ))}
          </div>
        ))}
      </div>
    );

    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        {/* Mobile: 15 weeks */}
        <div className="block sm:hidden">{renderSkeletonGrid(5, "w-[10px] h-[10px]")}</div>

        {/* Tablet: 25 weeks */}
        <div className="hidden sm:block lg:hidden">{renderSkeletonGrid(10, "w-[12px] h-[12px]")}</div>

        {/* Desktop: 40 weeks */}
        <div className="hidden lg:block xl:hidden">{renderSkeletonGrid(10, "w-[14px] h-[14px]")}</div>

        {/* Large desktop: 52 weeks */}
        <div className="hidden xl:block">{renderSkeletonGrid(10, "w-[16px] h-[16px]")}</div>
      </div>
    );
  }

  if (error || calendarData.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-gray-500">{error || "No GitHub activity data available"}</div>;
  }

  return <GithubActivityClient calendarData={calendarData} />;
}
