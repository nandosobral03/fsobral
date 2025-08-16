"use client";

import { useEffect, useMemo, useState } from "react";

interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

interface GithubActivityClientProps {
  calendarData: CalendarData[];
  startFromDark?: boolean;
  fillEmpty?: boolean;
  forceDark?: boolean;
  disableTooltips?: boolean;
}

export default function GithubActivityClient({ calendarData, startFromDark = false, fillEmpty = false, forceDark = false, disableTooltips = false }: GithubActivityClientProps) {
  const [isRevealed, setIsRevealed] = useState(!startFromDark);

  useEffect(() => {
    if (!startFromDark) return;
    const id = requestAnimationFrame(() => setIsRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [startFromDark]);

  const darkColor = "#1a1917";

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

  const placeholderDay: CalendarData = useMemo(() => ({ date: "", count: 0, level: 0, weekday: 0 }), []);

  const createWeeks = (weekCount: number) => {
    const required = weekCount * 7;
    let displayData = calendarData.slice(-required);
    if (fillEmpty && displayData.length < required) {
      const deficit = required - displayData.length;
      const filler: CalendarData[] = Array.from({ length: deficit }, (_, idx) => ({
        ...placeholderDay,
        weekday: idx % 7,
      }));
      displayData = [...filler, ...displayData];
    }
    const weeks = [] as CalendarData[][];
    for (let i = 0; i < displayData.length; i += 7) {
      const week = displayData.slice(i, i + 7);
      week.sort((a, b) => a.weekday - b.weekday);
      weeks.push(week);
    }
    return weeks;
  };

  const renderGrid = (weeks: CalendarData[][], sizeClass: string) => (
    <div className="flex gap-1 relative flex-col md:flex-row">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-row md:flex-col gap-1">
          {week.map((day: CalendarData, dayIndex: number) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`${sizeClass} rounded-sm relative group cursor-pointer transition-colors duration-700 ease-in-out`}
              style={{ backgroundColor: forceDark ? darkColor : isRevealed ? getColor(day.level) : darkColor }}
              title={day.date ? `${day.count} contributions on ${day.date}` : undefined}
            >
              {!disableTooltips && day.date && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {day.count} contributions on {day.date}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      {/* Mobile: 15 weeks */}
      <div className="block sm:hidden">{renderGrid(createWeeks(20), "w-[10px] h-[10px]")}</div>

      {/* Tablet: 25 weeks */}
      <div className="hidden sm:block md:hidden">{renderGrid(createWeeks(16), "w-[12px] h-[12px]")}</div>

      {/* Tablet: 25 weeks */}
      <div className="hidden md:block lg:hidden">{renderGrid(createWeeks(25), "w-[12px] h-[12px]")}</div>

      {/* Desktop: 40 weeks */}
      <div className="hidden lg:block xl:hidden">{renderGrid(createWeeks(28), "w-[14px] h-[14px]")}</div>

      {/* Large desktop: 52 weeks */}
      <div className="hidden xl:block 2xl:hidden">{renderGrid(createWeeks(32), "w-[16px] h-[16px]")}</div>

      {/* Large desktop: 52 weeks */}
      <div className="hidden 2xl:block">{renderGrid(createWeeks(40), "w-[16px] h-[16px]")}</div>
    </div>
  );
}
