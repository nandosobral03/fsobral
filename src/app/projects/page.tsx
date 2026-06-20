import { Fragment } from "react";
import FadeIn from "@/components/common/fade-in";
import LargeTitle from "@/components/common/large-title";
import { projects } from "@/content";
import ProjectsInfo from "./projects-info";
import ProjectsByYear from "./projects-by-year";
import { EditorialSection, MetaLabel, StructuralRule } from "@/components/common/editorial";

export default function Home() {
  const projectYears = projects.years();

  return (
    <>
      <FadeIn className="mb-8">
        <LargeTitle
          alt="AORNUM"
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
      </FadeIn>

      <ProjectsInfo />

      <EditorialSection tone="ink" className="border-t border-background/10">
        <div className="flex flex-col gap-[var(--lh)] py-[var(--lh)] md:flex-row md:items-end md:justify-between">
          <MetaLabel className="text-background/35">Project index</MetaLabel>

          <div className="flex flex-col gap-[var(--bl)] md:items-end">
            <div className="flex flex-wrap gap-2">
              {projectYears.map((projectYear) => (
                <a
                  key={projectYear.year}
                  href={`#projects-${projectYear.year}`}
                  className="meta-label text-background/35 transition-colors hover:text-accent"
                >
                  {projectYear.year}
                </a>
              ))}
            </div>
          </div>
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
