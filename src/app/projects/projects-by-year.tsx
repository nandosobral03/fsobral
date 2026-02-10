"use client";

import SectionDescription from "@/components/common/section-description";
import { projects } from "@/app/projects/projects";
import { ProjectGrid } from "./project-grid";
import { motion } from "motion/react";

export default function ProjectsByYear({ year, preface, side = "left" }: { year: number; preface: React.ReactNode; side?: "left" | "right" }) {
  const yearProjects = projects.filter((project) => project.year === year);

  return (
    <div className="w-full flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-7xl">
        <div className={`flex flex-col md:flex-row gap-8 md:gap-12 ${side === "right" ? "md:flex-row-reverse" : ""}`}>
          {/* Year + preface column, sticky on desktop */}
          <div className="md:w-[280px] lg:w-[320px] flex-shrink-0">
            <div className="md:sticky md:top-24">
              <motion.h2
                className={`text-7xl md:text-8xl font-bold font-condensed tracking-wide leading-none ${side === "right" ? "md:text-right" : ""}`}
                initial={{ opacity: 0, x: side === "right" ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {year}
              </motion.h2>
              <motion.span
                className={`meta-label text-foreground/40 block mt-2 mb-6 ${side === "right" ? "md:text-right" : ""}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {yearProjects.length} projects
              </motion.span>
              <div className={`${side === "right" ? "border-r-4 border-accent pr-6 md:text-right" : "border-l-4 border-accent pl-6"}`}>
                <SectionDescription>{preface}</SectionDescription>
              </div>
            </div>
          </div>

          {/* Project grid column */}
          <div className="flex-1 min-w-0">
            <ProjectGrid projects={yearProjects} />
          </div>
        </div>
      </div>
    </div>
  );
}
