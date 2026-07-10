import SectionDescription from "@/components/common/section-description";
import type { ProjectYearContentSurface } from "@/content";
import { ProjectGrid } from "./project-grid";
import { EditorialGrid, EditorialSection, MetaLabel } from "@/components/common/editorial";

export default function ProjectsByYear({ projectYear }: { projectYear: ProjectYearContentSurface }) {
  const { year, preface, entries, cardEntries } = projectYear;

  return (
    <EditorialSection id={`projects-${year}`} className="scroll-mt-20 py-[calc(var(--lh)*1.5)]">
      <EditorialGrid>
          <div className="[grid-column:1/-1] md:[grid-column:1/4]">
            <div className="md:sticky md:top-24">
              <h2 className="display-title text-7xl md:text-8xl">
                {year}
              </h2>
              <span className="block mt-2 mb-6">
                <MetaLabel className="paper-meta">{entries.length} projects</MetaLabel>
              </span>
              <div className="border-l-2 border-accent pl-[var(--lh)]">
                <SectionDescription>{preface}</SectionDescription>
              </div>
            </div>
          </div>

          <div className="[grid-column:1/-1] md:[grid-column:5/13] min-w-0">
            <ProjectGrid cards={cardEntries} />
          </div>
      </EditorialGrid>
    </EditorialSection>
  );
}
