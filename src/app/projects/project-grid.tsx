"use client";

import ProjectCard from "@/components/sections/project-card";
import { Project } from "@/app/projects/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="flex gap-4 p-4 flex-wrap items-center justify-center">
      {projects.map((project, index) => (
        <ProjectCard key={index} title={project.name} year={project.year} image={project.preview.cover}>
          {project.preview.description}
        </ProjectCard>
      ))}
    </div>
  );
}
