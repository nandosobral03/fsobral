"use client";

import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

interface GithubActivityClientProps {
  calendarData: CalendarData[];
}

export default function GithubActivityClient({ calendarData }: GithubActivityClientProps) {
  const [weeksToShow, setWeeksToShow] = useState((window.innerWidth * 0.4) / 16);
  const [displayData, setDisplayData] = useState<CalendarData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const newWeeksToShow = Math.floor((window.innerWidth * (mobile ? 0.8 : 0.4) - 32) / 16);
      setWeeksToShow(Math.max(newWeeksToShow, 1));
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (calendarData.length > 0 && weeksToShow > 0) {
      const daysToShow = weeksToShow * 7;
      setDisplayData(calendarData.slice(-daysToShow));
    }
  }, [weeksToShow, calendarData]);

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "#bfbbb0";
      case 1:
        return "#8a8580";
      case 2:
        return "#76736d";
      case 3:
        return "#615f5a";
      case 4:
        return "#4d4b47";
      case 5:
        return "#2d2b27";
      case 6:
        return "#1a1917";
    }
  };

  const weeks = [];
  for (let i = 0; i < displayData.length; i += 7) {
    const week = displayData.slice(i, i + 7);
    // Sort days by weekday to maintain consistent order
    week.sort((a, b) => a.weekday - b.weekday);
    weeks.push(week);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <div className={`flex gap-1 relative ${isMobile ? "flex-col" : ""}`}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={`flex ${isMobile ? "flex-row" : "flex-col"} gap-1`}>
            {week.map((day, dayIndex) => (
              <Tippy key={`${weekIndex}-${dayIndex}`} content={`${day.count} contributions on ${day.date}`}>
                <div className={`${isMobile ? "w-[12px] h-[12px]" : "w-[16px] h-[16px]"} rounded-sm`} style={{ backgroundColor: getColor(day.level) }} />
              </Tippy>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
