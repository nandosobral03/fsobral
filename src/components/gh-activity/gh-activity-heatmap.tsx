"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CalendarData } from "@/lib/github-activity";
import {
  createHeatmapWeeks,
  getContributionColor,
  getContributionQuartiles,
  getHeatmapMonthLabels,
  getVisibleHeatmapWeekCount,
  HEATMAP_DARK_COLOR,
  HEATMAP_SWEEP_DURATION_MS,
} from "@/lib/heatmap";

interface GithubActivityClientProps {
  calendarData: CalendarData[];
  startFromDark?: boolean;
  fillEmpty?: boolean;
  disableTooltips?: boolean;
  vertical?: boolean;
}

export default function GithubActivityClient({ calendarData, startFromDark = false, fillEmpty = false, disableTooltips = false, vertical: verticalProp = false }: GithubActivityClientProps) {
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

  const lastPointerPos = useRef<{ x: number; y: number } | null>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const current = { x: e.clientX, y: e.clientY };
    const last = lastPointerPos.current;
    lastPointerPos.current = current;

    const points: { x: number; y: number }[] = [];
    if (last) {
      const dx = current.x - last.x;
      const dy = current.y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.ceil(dist / 4));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        points.push({ x: last.x + dx * t, y: last.y + dy * t });
      }
    } else {
      points.push(current);
    }

    const activated = new Set<Element>();
    for (const pt of points) {
      const el = document.elementFromPoint(pt.x, pt.y);
      if (!el || !el.classList.contains("heatmap-cell")) continue;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const step = rect.width + 2; // cell size + gap

      const radius = 2;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          if (dx * dx + dy * dy > radius * radius) continue;
          const neighbor = document.elementFromPoint(cx + dx * step, cy + dy * step);
          if (!neighbor || !neighbor.classList.contains("heatmap-cell") || activated.has(neighbor)) continue;
          activated.add(neighbor);
          neighbor.classList.add("heatmap-active");
          const prev = (neighbor as HTMLElement).dataset.fadeTimeout;
          if (prev) clearTimeout(Number(prev));
          const tid = setTimeout(() => {
            neighbor.classList.remove("heatmap-active");
          }, 300);
          (neighbor as HTMLElement).dataset.fadeTimeout = String(tid);
        }
      }
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    lastPointerPos.current = null;
  }, []);

  const quartiles = useMemo(() => getContributionQuartiles(calendarData), [calendarData]);
  const getColor = useCallback((count: number) => getContributionColor(count, quartiles), [quartiles]);

  const containerRef = useRef<HTMLDivElement>(null);
  const availableWeeks = Math.floor(calendarData.length / 7);
  const [weekCount, setWeekCount] = useState(0);

  const [vertical, setVertical] = useState(verticalProp);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calculate = () => {
      const width = el.clientWidth;
      const isVertical = verticalProp || width < 500;
      setVertical(isVertical);

      setWeekCount(getVisibleHeatmapWeekCount(width, availableWeeks, isVertical));
    };

    calculate();
    const observer = new ResizeObserver(calculate);
    observer.observe(el);
    return () => observer.disconnect();
  }, [availableWeeks, verticalProp]);

  const sweepDurationMs = HEATMAP_SWEEP_DURATION_MS;

  const renderGrid = (weeks: CalendarData[][], sizeClass: string) => {
    const monthLabels = getHeatmapMonthLabels(weeks);
    const totalWeeks = weeks.length;

    if (vertical) {
      return (
        <div
          className="grid w-full gap-[2px]"
          style={{ gridTemplateColumns: "2.5rem repeat(7, 1fr)" }}
        >
          {weeks.map((week, weekIndex) => {
            const label = monthLabels.find((l) => l.weekIndex === weekIndex);
            return (
              <div key={`row-${weekIndex}`} className="contents">
                <div className="flex items-center justify-end pr-1">
                  {label && (
                    <span
                      className={`meta-label text-[9px] whitespace-nowrap ${label.isYear ? "text-background/70 font-bold" : "text-background/40"}`}
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
                {week.map((day: CalendarData, dayIndex: number) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="aspect-square rounded-none cursor-pointer heatmap-cell"
                    style={{
                      backgroundColor: isRevealed ? getColor(day.count) : HEATMAP_DARK_COLOR,
                      '--sweep-delay': `${(weekIndex / totalWeeks) * sweepDurationMs}ms`,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => handleCellEnter(e, day)}
                    onMouseLeave={handleCellLeave}
                  />
                ))}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full">
        {/* Month/year labels row */}
        <div className="flex gap-[2px] w-full mb-1 h-4">
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
        {/* Horizontal grid: weeks as columns, days as rows */}
        <div className="flex gap-[2px] relative flex-row w-full overflow-hidden">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px] flex-1 min-w-0">
              {week.map((day: CalendarData, dayIndex: number) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`${sizeClass} rounded-none cursor-pointer heatmap-cell`}
                  style={{
                    backgroundColor: isRevealed ? getColor(day.count) : HEATMAP_DARK_COLOR,
                    '--sweep-delay': `${(weekIndex / totalWeeks) * sweepDurationMs}ms`,
                  } as React.CSSProperties}
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
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center gap-2" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {weekCount > 0 && vertical ? (
        <>
          <div className="w-full md:hidden">
            {renderGrid(createHeatmapWeeks(calendarData, Math.min(weekCount, 26), fillEmpty), "aspect-square")}
          </div>
          <div className="w-full hidden md:block">
            {renderGrid(createHeatmapWeeks(calendarData, weekCount, fillEmpty), "aspect-square")}
          </div>
        </>
      ) : weekCount > 0 ? (
        renderGrid(createHeatmapWeeks(calendarData, weekCount, fillEmpty), "aspect-square")
      ) : null}
      {tooltip && (
        <div
          className="fixed z-[9999] flex items-baseline gap-2 px-3 py-1.5 border border-accent/40 bg-foreground/95 backdrop-blur-sm pointer-events-none whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y - 10, transform: `translateX(-50%) translateY(-100%)` }}
        >
          <span className="text-sm font-condensed font-bold text-background">{tooltip.count}</span>
          <span className="w-px h-3 bg-background/20" />
          <span className="meta-label text-[9px] text-background/30">
            {new Date(tooltip.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      )}
    </div>
  );
}
