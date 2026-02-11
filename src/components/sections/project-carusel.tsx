"use client";

import { projects } from "@/app/projects/projects";
import { motion, useMotionValue, animate } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import ProjectCard from "./project-card";

export default function ProjectCarousel() {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  const [viewportWidth, setViewportWidth] = useState<number>(() => typeof window !== "undefined" ? window.innerWidth : 1200);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    setIsMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- hydration flag

    // Use matchMedia for mobile breakpoint (only fires on transition)
    const mql = window.matchMedia("(max-width: 767px)");
    const mqlHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", mqlHandler);

    // Viewport width still needs resize for card layout calculations
    const resizeHandler = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);

    return () => {
      mql.removeEventListener("change", mqlHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const cardWidth = isMobile ? 280 : 420;
  const gap = 16;
  const containerWidth = isMounted ? viewportWidth : 1200;
  const sidePadding = 24;
  const totalWidth = projects.length * cardWidth + (projects.length - 1) * gap + sidePadding * 2;
  const overflow = totalWidth - containerWidth;
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

  // SSR/initial render: show static version
  if (!isMounted) {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex gap-4 px-6">
          {projects.slice(0, 3).map((project, index) => (
            <div key={index} className="flex-shrink-0">
              <ProjectCard title={project.name} image={project.preview.cover} year={project.year}>
                {project.preview.description}
              </ProjectCard>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group/carousel">
      {/* Left arrow */}
      <button
        onClick={() => scrollBy(1)}
        disabled={atStart}
        aria-label="Scroll left"
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background text-foreground border border-foreground/20 flex items-center justify-center transition-all duration-300 hover:border-foreground/50 ${atStart ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/carousel:opacity-100 md:opacity-70"}`}
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
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background text-foreground border border-foreground/20 flex items-center justify-center transition-all duration-300 hover:border-foreground/50 ${atEnd ? "opacity-0 pointer-events-none" : "opacity-0 group-hover/carousel:opacity-100 md:opacity-70"}`}
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
          className="flex gap-4 cursor-grab"
          onClickCapture={(e) => { if (isDragging.current) e.preventDefault(); }}
          onWheel={(e) => {
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
          {projects.map((project, index) => (
            <motion.div key={index} className="flex-shrink-0">
              <ProjectCard title={project.name} image={project.preview.cover} year={project.year}>
                {project.preview.description}
              </ProjectCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
