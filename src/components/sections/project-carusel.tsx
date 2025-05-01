"use client";

import { projects } from "@/app/projects/projects";
import ProjectCard from "./project-card";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useRef } from "react";

export default function ProjectCarousel() {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardWidth = isMobile ? 300 : 600;
  const gap = 16;
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const leftConstraint = -(projects.length * cardWidth + (projects.length - 1) * gap - containerWidth) - 60;

  return (
    <AnimatePresence>
      <motion.div ref={constraintsRef} className="w-full overflow-hidden">
        <motion.div
          style={{ x }}
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
    </AnimatePresence>
  );
}
