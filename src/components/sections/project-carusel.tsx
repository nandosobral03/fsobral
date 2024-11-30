"use client";

import { projects } from "@/app/projects/projects";
import ProjectCard from "./project-card";
import { motion } from "motion/react";
import { useRef } from "react";

export default function ProjectCarousel() {
  const constraintsRef = useRef(null);

  return (
    <motion.div ref={constraintsRef} className="w-full overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{
          left: -(projects.length * (typeof window !== "undefined" && window.innerWidth < 768 ? 300 : 600) + (projects.length - 1) * 16 - (typeof window !== "undefined" ? window.innerWidth : 0)) - 60,
          right: 0,
        }}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
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
