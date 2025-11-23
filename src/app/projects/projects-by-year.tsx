"use client";

import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import { projects } from "@/app/projects/projects";
import { ProjectGrid } from "./project-grid";

export default function ProjectsInfo({ year, preface }: { year: number; preface: React.ReactNode }) {
  const yearProjects = projects.filter((project) => project.year === year);

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full max-w-7xl">
        {/* Year Header with Stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 pb-6 border-b-[3px] border-foreground">
          <div className="flex items-baseline gap-4">
            <SectionTitle>{year}</SectionTitle>
          </div>
        </div>

        {/* Preface in a styled container */}
        <div className="mb-12 p-6 border-l-4 border-accent bg-foreground text-background">
          <SectionDescription>{preface}</SectionDescription>
        </div>

        {/* Projects Grid */}
        <ProjectGrid projects={yearProjects} />
      </div>
    </div>
  );
}
