import SectionTitle from "@/components/common/section-title";
import ProjectCarouselWrapper from "./project-carusel-wrapper";
import Link from "next/link";
import { EditorialSection } from "@/components/common/editorial";
import { projects } from "@/content";

export default function Projects() {
  const projectCards = projects.cardEntries();

  return (
    <EditorialSection>
      <section className="flex flex-col gap-[var(--bl)]">
        <SectionTitle index="02">Projects</SectionTitle>
        <div className="flex items-baseline justify-between gap-[var(--lh)]">
          <p className="editorial-copy text-foreground/55">
            I like building things
          </p>
          <Link
            href="/projects"
            className="meta-label text-foreground/30 hover:text-foreground transition-colors duration-300"
          >
            View all
          </Link>
        </div>
      </section>
      <section className="flex flex-col items-stretch pt-[var(--lh)]">
        <div className="-mx-[var(--margin)]">
          <ProjectCarouselWrapper cards={projectCards} />
        </div>
      </section>
    </EditorialSection>
  );
}
