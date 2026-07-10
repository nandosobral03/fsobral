import { Fragment } from "react";
import LargeTitle from "@/components/common/large-title";
import { projects } from "@/content";
import ProjectsInfo from "./projects-info";
import ProjectsByYear from "./projects-by-year";
import { EditorialSection, MetaLabel, StructuralRule } from "@/components/common/editorial";
import { ProjectArchiveGraphic } from "@/components/common/editorial-data-graphics";

export default function Home() {
  const projectYears = projects.years();

  return (
    <>
      <LargeTitle
        alt="AORNUM"
        artworkGraphic="sisyphus-effort"
        variant="page"
        textClassName="text-[10vw] xl:text-[7rem]"
        backgroundImage="/images/sisyphus.png"
        backgroundImageFallback={{
          desktop: "/images/sisyphus-ascii-desktop.png",
          mobile: "/images/sisyphus-ascii-mobile.png",
        }}
      >
        PROJECTS
      </LargeTitle>

      <ProjectsInfo />

      <EditorialSection tone="ink" className="border-t border-background/10">
        <div className="grid gap-[var(--lh)] py-[var(--lh)] md:grid-cols-12 md:items-end">
          <MetaLabel className="on-ink-meta md:[grid-column:1/3]">Project index</MetaLabel>
          <ProjectArchiveGraphic
            years={projectYears.map((projectYear) => ({
              year: projectYear.year,
              count: projectYear.entries.length,
            }))}
            className="[grid-column:1/-1] md:[grid-column:4/13]"
          />
        </div>
      </EditorialSection>

      <StructuralRule />

      {projectYears.map((projectYear, index) => (
        <Fragment key={projectYear.year}>
          {index > 0 && <StructuralRule />}
          <ProjectsByYear projectYear={projectYear} />
        </Fragment>
      ))}
    </>
  );
}
