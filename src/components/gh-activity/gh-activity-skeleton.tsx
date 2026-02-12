"use client";

import { useEffect, useRef, useState } from "react";

const ROWS = 7;
const GAP = 2;
const SWEEP_DURATION_MS = 1200;

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
      const targetCell = 14;
      setWeekCount(Math.floor(width / (targetCell + GAP)));
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
            backgroundColor: isRevealed ? "#1d1d1d" : "#1a1917",
            transition: "background-color 400ms ease-out",
          }}
        />
        <div
          className="h-4 w-48 rounded-sm"
          style={{
            backgroundColor: isRevealed ? "#1d1d1d" : "#1a1917",
            transition: "background-color 400ms ease-out",
          }}
        />
      </div>
      <div className="flex gap-[2px] w-full overflow-hidden">
        {Array.from({ length: weekCount }, (_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px] flex-1 min-w-0">
            {Array.from({ length: ROWS }, (_, dayIndex) => (
              <div
                key={dayIndex}
                className="aspect-square rounded-none"
                style={{
                  backgroundColor: isRevealed ? "#1d1d1d" : "#1a1917",
                  transition: "background-color 400ms ease-out",
                  transitionDelay: `${(weekIndex / weekCount) * SWEEP_DURATION_MS}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
