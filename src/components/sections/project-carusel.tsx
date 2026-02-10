"use client";

import { projects } from "@/app/projects/projects";
import { motion, useMotionValue } from "motion/react";
import { useRef, useState, useEffect } from "react";
import ProjectCard from "./project-card";

export default function ProjectCarousel() {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    setIsMounted(true);
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const cardWidth = isMobile ? 280 : 420;
  const gap = 16;
  const containerWidth = isMounted ? viewportWidth : 1200; // Default desktop width
  const sidePadding = 24;
  const totalWidth = projects.length * cardWidth + (projects.length - 1) * gap + sidePadding * 2;
  const overflow = totalWidth - containerWidth;
  const leftConstraint = overflow > 0 ? -overflow : 0;

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
        whileTap={{ cursor: "grabbing" }}
        className="flex gap-4 cursor-grab"
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
  );
}
