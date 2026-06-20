import SectionDescription from "@/components/common/section-description";
import type { ProjectYearContentSurface } from "@/content";
import { ProjectGrid } from "./project-grid";
import { EditorialGrid, EditorialSection, MetaLabel } from "@/components/common/editorial";

export default function ProjectsByYear({ projectYear }: { projectYear: ProjectYearContentSurface }) {
  const { year, side, preface, entries, cardEntries } = projectYear;

  return (
    <EditorialSection id={`projects-${year}`} className="py-[calc(var(--lh)*2)]">
      <EditorialGrid>
          <div className={side === "right" ? "[grid-column:1/-1] md:[grid-column:10/13]" : "[grid-column:1/-1] md:[grid-column:1/4]"}>
            <div className="md:sticky md:top-24">
              <h2
                className={`display-title text-7xl md:text-8xl ${side === "right" ? "md:text-right" : ""}`}
              >
                {year}
              </h2>
              <span
                className={`block mt-2 mb-6 ${side === "right" ? "md:text-right" : ""}`}
              >
                <MetaLabel className="text-foreground/40">{entries.length} projects</MetaLabel>
              </span>
              <div className={`${side === "right" ? "border-r-2 border-accent pr-[var(--lh)] md:text-right" : "border-l-2 border-accent pl-[var(--lh)]"}`}>
                <SectionDescription>{preface}</SectionDescription>
              </div>
            </div>
          </div>

          <div className={side === "right" ? "[grid-column:1/-1] md:[grid-column:1/9] min-w-0" : "[grid-column:1/-1] md:[grid-column:5/13] min-w-0"}>
            <ProjectGrid cards={cardEntries} />
          </div>
      </EditorialGrid>
    </EditorialSection>
  );
}
