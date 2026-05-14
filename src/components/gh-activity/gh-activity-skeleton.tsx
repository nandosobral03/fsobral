"use client";

import { useEffect, useRef, useState } from "react";
import { getVisibleHeatmapWeekCount, HEATMAP_DARK_COLOR, HEATMAP_GAP, HEATMAP_SWEEP_DURATION_MS } from "@/lib/heatmap";

const ROWS = 7;
const DEFAULT_WEEKS = 52;

export default function GhActivitySkeleton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [weekCount, setWeekCount] = useState(DEFAULT_WEEKS);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calculate = () => {
      const width = el.clientWidth;
      setWeekCount(getVisibleHeatmapWeekCount(width, DEFAULT_WEEKS, false));
    };

    calculate();
    const observer = new ResizeObserver(calculate);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center gap-2">
      <div className="w-full flex items-baseline justify-between mb-1 font-mono text-xs">
        <div
          className="h-4 w-32 rounded-sm"
          style={{
            backgroundColor: isRevealed ? "#1d1d1d" : HEATMAP_DARK_COLOR,
            transition: "background-color 400ms ease-out",
          }}
        />
        <div
          className="h-4 w-48 rounded-sm"
          style={{
            backgroundColor: isRevealed ? "#1d1d1d" : HEATMAP_DARK_COLOR,
            transition: "background-color 400ms ease-out",
          }}
        />
      </div>
      <div className="flex w-full overflow-hidden" style={{ gap: HEATMAP_GAP }}>
        {Array.from({ length: weekCount }, (_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col flex-1 min-w-0" style={{ gap: HEATMAP_GAP }}>
            {Array.from({ length: ROWS }, (_, dayIndex) => (
              <div
                key={dayIndex}
                className="aspect-square rounded-none"
                style={{
                  backgroundColor: isRevealed ? "#1d1d1d" : HEATMAP_DARK_COLOR,
                  transition: "background-color 400ms ease-out",
                  transitionDelay: `${(weekIndex / weekCount) * HEATMAP_SWEEP_DURATION_MS}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
