import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import { projects, type Project } from "@/server/projects";
import { ProjectGrid } from "./project-grid";

export default function ProjectsInfo({ year, preface }: { year: number; preface: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-stretch p-6 ">
      <div className="w-full flex flex-col gap-4 pr-6">
        <SectionTitle>{year}</SectionTitle>
        <SectionDescription>{preface}</SectionDescription>
      </div>
      <ProjectGrid projects={projects.filter((project) => project.year === year)} />
    </div>
  );
}
