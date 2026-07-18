"use client";

import { motion, useMotionValue, animate } from "motion/react";
import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import ProjectCard from "./project-card";
import type { ProjectCardEntry } from "@/content";

const MOBILE_QUERY = "(max-width: 767px)";

const subscribeToMobile = (callback: () => void) => {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const subscribeToViewport = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export default function ProjectCarousel({
  cards: projectCards,
}: {
  cards: readonly ProjectCardEntry[];
}) {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
  const viewportWidth = useSyncExternalStore(
    subscribeToViewport,
    () => window.innerWidth,
    () => 1200,
  );
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const cardWidth = isMobile ? 280 : 420;
  const gap = 16;
  const sidePadding = 32;
  const totalWidth = projectCards.length * cardWidth + (projectCards.length - 1) * gap + sidePadding * 2;
  const overflow = totalWidth - viewportWidth;
  const leftConstraint = overflow > 0 ? -overflow : 0;

  const updateBounds = useCallback((currentX: number) => {
    setAtStart(currentX >= -10);
    setAtEnd(currentX <= leftConstraint + 10);
  }, [leftConstraint]);

  useEffect(() => {
    const unsubscribe = x.on("change", updateBounds);
    return () => unsubscribe();
  }, [x, updateBounds]);

  const isDragging = useRef(false);

  const scrollBy = useCallback((direction: number) => {
    const scrollAmount = (cardWidth + gap) * (isMobile ? 1 : 2);
    const newX = x.get() + direction * scrollAmount;
    const clampedX = Math.min(Math.max(newX, leftConstraint), 0);
    animate(x, clampedX, { type: "spring", stiffness: 300, damping: 30 });
  }, [x, cardWidth, gap, isMobile, leftConstraint]);

  return (
    <div className="relative group/carousel">
      {/* Left arrow */}
      <button
        onClick={() => scrollBy(1)}
        disabled={atStart}
        aria-label="Scroll left"
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background text-foreground border border-foreground/20 flex items-center justify-center transition-all duration-300 hover:border-foreground/50 focus-visible:opacity-100 ${atStart ? "opacity-0 pointer-events-none" : "opacity-70 md:opacity-0 md:group-hover/carousel:opacity-100"}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scrollBy(-1)}
        disabled={atEnd}
        aria-label="Scroll right"
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background text-foreground border border-foreground/20 flex items-center justify-center transition-all duration-300 hover:border-foreground/50 focus-visible:opacity-100 ${atEnd ? "opacity-0 pointer-events-none" : "opacity-70 md:opacity-0 md:group-hover/carousel:opacity-100"}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <motion.div ref={constraintsRef} className="w-full overflow-hidden py-4" transition={{ duration: 0.5, ease: "linear" }}>
        <motion.div
          style={{ x, paddingLeft: sidePadding, paddingRight: sidePadding }}
          drag="x"
          dragConstraints={{
            left: leftConstraint,
            right: 0,
          }}
          dragElastic={0.1}
          dragMomentum={true}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={() => { requestAnimationFrame(() => { isDragging.current = false; }); }}
          whileTap={{ cursor: "grabbing" }}
          className="flex touch-pan-y gap-4 cursor-grab"
          onClickCapture={(e) => { if (isDragging.current) e.preventDefault(); }}
          onWheel={(e) => {
            const isHorizontalIntent = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
            if (!isHorizontalIntent) return;
            e.preventDefault();
            const delta = e.deltaX || e.deltaY;
            const newX = x.get() - delta;
            const clampedX = Math.min(Math.max(newX, leftConstraint), 0);
            x.set(clampedX);
          }}
          transition={{
            ease: "linear",
          }}
        >
          {projectCards.map((card) => {
            return (
            <motion.div key={card.href} className="flex-shrink-0">
              <ProjectCard {...card}>
                {card.description}
              </ProjectCard>
            </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
