"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  disableTooltips?: boolean;
}

export default function GithubActivityClient({ calendarData, startFromDark = false, fillEmpty = false, disableTooltips = false }: GithubActivityClientProps) {
  const [isRevealed, setIsRevealed] = useState(!startFromDark);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; count: number; date: string } | null>(null);
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (!startFromDark) return;
    const id = requestAnimationFrame(() => setIsRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [startFromDark]);

  const handleCellEnter = useCallback((e: React.MouseEvent<HTMLDivElement>, day: CalendarData) => {
    if (disableTooltips || !day.date) return;
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      count: day.count,
      date: day.date,
    });
  }, [disableTooltips]);

  const handleCellLeave = useCallback(() => {
    tooltipTimeoutRef.current = setTimeout(() => setTooltip(null), 50);
  }, []);

  const darkColor = "#1a1917";

  const colors = ["#1d1d1d", "#1a3038", "#1e4a56", "#256878", "#2d879b", "#38a8bf"];

  const quartiles = useMemo(() => {
    const nonZero = calendarData.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
    if (nonZero.length === 0) return [1, 2, 3, 4];
    const q = (p: number) => nonZero[Math.max(0, Math.ceil(p * nonZero.length) - 1)];
    return [q(0.25), q(0.5), q(0.75), q(1)];
  }, [calendarData]);

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= quartiles[0]) return 1;
    if (count <= quartiles[1]) return 2;
    if (count <= quartiles[2]) return 3;
    if (count < quartiles[3]) return 4;
    return 5;
  };

  const getColor = (count: number) => colors[getLevel(count)];

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

  const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getMonthLabels = (weeks: CalendarData[][]) => {
    const labels: { weekIndex: number; label: string; isYear: boolean }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      // Find the first day of the month (day 1) in this week
      const firstOfMonth = week.find((d) => {
        if (!d.date) return false;
        const dayNum = parseInt(d.date.split("-")[2], 10);
        return dayNum === 1;
      });
      if (!firstOfMonth) return;

      const date = new Date(firstOfMonth.date + "T00:00:00");
      const month = date.getMonth();
      const year = date.getFullYear();

      if (month !== lastMonth) {
        const isYear = month === 0;
        const label = isYear ? `${year}` : MONTHS_SHORT[month];
        labels.push({ weekIndex, label, isYear });
        lastMonth = month;
      }
    });

    return labels;
  };

  const sweepDurationMs = 1000;

  const renderGrid = (weeks: CalendarData[][], sizeClass: string) => {
    const monthLabels = getMonthLabels(weeks);
    const totalWeeks = weeks.length;

    return (
      <div className="flex flex-col w-full">
        {/* Month/year labels row */}
        <div className="hidden md:flex gap-[2px] w-full mb-1 h-4">
          {weeks.map((_, weekIndex) => {
            const label = monthLabels.find((l) => l.weekIndex === weekIndex);
            return (
              <div key={weekIndex} className="flex-1 relative">
                {label && (
                  <span
                    className={`meta-label text-[9px] absolute left-0 top-0 whitespace-nowrap ${label.isYear ? "text-background/70 font-bold" : "text-background/40"}`}
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transition: `opacity 300ms ease`,
                      transitionDelay: `${(weekIndex / totalWeeks) * sweepDurationMs}ms`,
                    }}
                  >
                    {label.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {/* Grid */}
        <div className="flex gap-[2px] relative flex-col md:flex-row w-full">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-row md:flex-col gap-[2px] flex-1">
              {week.map((day: CalendarData, dayIndex: number) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`${sizeClass} rounded-none cursor-pointer hover:brightness-150`}
                  style={{
                    backgroundColor: isRevealed ? getColor(day.count) : darkColor,
                    transition: `background-color 400ms ease-out`,
                    transitionDelay: `${(weekIndex / totalWeeks) * sweepDurationMs}ms`,
                  }}
                  onMouseEnter={(e) => handleCellEnter(e, day)}
                  onMouseLeave={handleCellLeave}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="block sm:hidden w-full">{renderGrid(createWeeks(26), "aspect-square")}</div>
      <div className="hidden sm:block md:hidden w-full">{renderGrid(createWeeks(52), "aspect-square")}</div>
      <div className="hidden md:block lg:hidden w-full">{renderGrid(createWeeks(72), "aspect-square")}</div>
      <div className="hidden lg:block xl:hidden w-full">{renderGrid(createWeeks(90), "aspect-square")}</div>
      <div className="hidden xl:block 2xl:hidden w-full">{renderGrid(createWeeks(78), "aspect-square")}</div>
      <div className="hidden 2xl:block w-full">{renderGrid(createWeeks(104), "aspect-square")}</div>
      {tooltip && (
        <div
          className="fixed z-[9999] flex items-baseline gap-2 px-3 py-1.5 border border-accent/40 bg-foreground/95 backdrop-blur-sm pointer-events-none whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y - 10, transform: `translateX(-50%) translateY(-100%)` }}
        >
          <span className="text-sm font-condensed font-bold text-background">{tooltip.count}</span>
          <span className="w-px h-3 bg-background/20" />
          <span className="meta-label text-[9px] text-background/50">
            {new Date(tooltip.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      )}
    </div>
  );
}
