"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CalendarData } from "@/lib/github-activity";
import {
  createHeatmapWeeks,
  getContributionColor,
  getContributionLevel,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef(new Map<string, HTMLDivElement>());
  const fadeTimeouts = useRef(new Map<HTMLDivElement, ReturnType<typeof setTimeout>>());
  const pointerFrameRef = useRef<number>(0);
  const pendingPointerRef = useRef<{ x: number; y: number } | null>(null);
  const lastCellRef = useRef<{ x: number; y: number } | null>(null);
  const lastTooltipCellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!startFromDark) return;
    const id = requestAnimationFrame(() => setIsRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [startFromDark]);

  const setCellRef = useCallback((key: string, node: HTMLDivElement | null) => {
    if (node) {
      cellRefs.current.set(key, node);
    } else {
      cellRefs.current.delete(key);
    }
  }, []);

  const activateBrush = useCallback((points: { x: number; y: number }[]) => {
    const activated = new Map<HTMLDivElement, number>();
    for (const point of points) {
      const radius = 2;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > radius) continue;
          const neighbor = cellRefs.current.get(`${point.x + dx}:${point.y + dy}`);
          if (!neighbor) continue;
          const strength = Math.max(0.25, 1 - distance / (radius + 0.5));
          activated.set(neighbor, Math.max(strength, activated.get(neighbor) ?? 0));
        }
      }
    }

    activated.forEach((strength, neighbor) => {
          neighbor.style.setProperty("--brush-grayscale", String(1 - strength));
          neighbor.style.setProperty("--brush-brightness", String(1 + strength * 0.22));
          neighbor.style.setProperty("--brush-saturation", String(1 + strength * 0.12));
          neighbor.classList.add("heatmap-active");
          const previousTimeout = fadeTimeouts.current.get(neighbor);
          if (previousTimeout) clearTimeout(previousTimeout);
          const timeout = setTimeout(() => {
            neighbor.classList.remove("heatmap-active");
            fadeTimeouts.current.delete(neighbor);
          }, 180 + strength * 180);
          fadeTimeouts.current.set(neighbor, timeout);
    });
  }, []);

  const processPointerFrame = useCallback(() => {
    pointerFrameRef.current = 0;
    const pointer = pendingPointerRef.current;
    pendingPointerRef.current = null;
    if (!pointer) return;

    const cell = document.elementFromPoint(pointer.x, pointer.y)?.closest<HTMLDivElement>(".heatmap-cell");
    if (!cell || !containerRef.current?.contains(cell)) {
      lastCellRef.current = null;
      lastTooltipCellRef.current = null;
      return;
    }

    if (!disableTooltips && cell.dataset.date && cell !== lastTooltipCellRef.current) {
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
      const rect = cell.getBoundingClientRect();
      setTooltip({
        x: rect.left + rect.width / 2,
        y: rect.top,
        count: Number(cell.dataset.count),
        date: cell.dataset.date,
      });
      lastTooltipCellRef.current = cell;
    }

    const current = {
      x: Number(cell.dataset.gridX),
      y: Number(cell.dataset.gridY),
    };
    const last = lastCellRef.current;
    const gridDistance = last ? Math.max(Math.abs(current.x - last.x), Math.abs(current.y - last.y)) : 0;
    const pathStart = last && gridDistance <= 8 ? last : current;
    const steps = Math.max(Math.abs(current.x - pathStart.x), Math.abs(current.y - pathStart.y));
    const points = Array.from({ length: steps + 1 }, (_, index) => {
      const progress = steps === 0 ? 1 : index / steps;
      return {
        x: Math.round(pathStart.x + (current.x - pathStart.x) * progress),
        y: Math.round(pathStart.y + (current.y - pathStart.y) * progress),
      };
    });

    activateBrush(points);
    lastCellRef.current = current;
  }, [activateBrush, disableTooltips]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    pendingPointerRef.current = { x: e.clientX, y: e.clientY };
    if (!pointerFrameRef.current) {
      pointerFrameRef.current = requestAnimationFrame(processPointerFrame);
    }
  }, [processPointerFrame]);

  const handlePointerLeave = useCallback(() => {
    pendingPointerRef.current = null;
    lastCellRef.current = null;
    lastTooltipCellRef.current = null;
    cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = 0;
    tooltipTimeoutRef.current = setTimeout(() => setTooltip(null), 50);
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(pointerFrameRef.current);
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    fadeTimeouts.current.forEach(clearTimeout);
    fadeTimeouts.current.clear();
  }, []);

  const quartiles = useMemo(() => getContributionQuartiles(calendarData), [calendarData]);
  const getColor = useCallback((count: number) => getContributionColor(count, quartiles), [quartiles]);
  const getLevel = useCallback((count: number) => getContributionLevel(count, quartiles), [quartiles]);

  const availableWeeks = Math.floor(calendarData.length / 7);
  const [weekCount, setWeekCount] = useState(0);

  const [vertical, setVertical] = useState(verticalProp);
  const [compactVertical, setCompactVertical] = useState(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calculate = () => {
      const width = el.clientWidth;
      const isVertical = verticalProp || width < 500;
      setVertical(isVertical);
      setCompactVertical(width < 768);

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
                    ref={(node) => setCellRef(`${dayIndex}:${weekIndex}`, node)}
                    data-grid-x={dayIndex}
                    data-grid-y={weekIndex}
                    data-date={day.date}
                    data-count={day.count}
                    data-level={getLevel(day.count)}
                    className="aspect-square rounded-none cursor-pointer heatmap-cell"
                    style={{
                      backgroundColor: HEATMAP_DARK_COLOR,
                      "--heat-color": getColor(day.count),
                      "--dither-opacity": isRevealed ? 1 : 0,
                      '--sweep-delay': `${(weekIndex / totalWeeks) * sweepDurationMs}ms`,
                    } as React.CSSProperties}
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
                  ref={(node) => setCellRef(`${weekIndex}:${dayIndex}`, node)}
                  data-grid-x={weekIndex}
                  data-grid-y={dayIndex}
                  data-date={day.date}
                  data-count={day.count}
                  data-level={getLevel(day.count)}
                  className={`${sizeClass} rounded-none cursor-pointer heatmap-cell`}
                  style={{
                    backgroundColor: HEATMAP_DARK_COLOR,
                    "--heat-color": getColor(day.count),
                    "--dither-opacity": isRevealed ? 1 : 0,
                    '--sweep-delay': `${(weekIndex / totalWeeks) * sweepDurationMs}ms`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center gap-2"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {weekCount > 0 && vertical ? (
        <div className="w-full">
          {renderGrid(
            createHeatmapWeeks(calendarData, compactVertical ? Math.min(weekCount, 26) : weekCount, fillEmpty),
            "aspect-square",
          )}
        </div>
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
