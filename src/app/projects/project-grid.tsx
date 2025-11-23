"use client";

import ProjectCard from "@/components/sections/project-card";
import { Project } from "@/app/projects/projects";
import { motion } from "motion/react";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: (index % 3) * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full"
        >
          <ProjectCard title={project.name} year={project.year} image={project.preview.cover} variant="grid">
            {project.preview.description}
          </ProjectCard>
        </motion.div>
      ))}
    </div>
  );
}
