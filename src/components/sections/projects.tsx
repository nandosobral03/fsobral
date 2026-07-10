import SectionTitle from "@/components/common/section-title";
import ProjectCarouselWrapper from "./project-carusel-wrapper";
import Link from "next/link";
import { EditorialSection } from "@/components/common/editorial";
import { projects } from "@/content";
import { FeaturedWorkGraphic } from "@/components/common/editorial-data-graphics";

export default function Projects() {
  const flagshipSlugs = ["spring84", "overload", "consequences", "atmosphere", "mimicrai"] as const;
  const flagshipProjects = flagshipSlugs.flatMap((slug) => {
    const project = projects.bySlug(slug);
    return project ? [project] : [];
  });
  const projectCards = projects.cardEntries(flagshipProjects);
  const graphicLabels: Record<(typeof flagshipSlugs)[number], string> = {
    spring84: "S84",
    overload: "OVL",
    consequences: "CNS",
    atmosphere: "ATM",
    mimicrai: "MIM",
  };
  const graphicItems = flagshipProjects.map((project) => ({
    label: graphicLabels[project.slug as (typeof flagshipSlugs)[number]],
    name: project.name,
    year: project.year,
    href: `/projects/${project.slug}`,
  }));

  return (
    <EditorialSection>
      <section id="selected-work" className="flex scroll-mt-24 flex-col gap-[var(--bl)]">
        <SectionTitle index="02">Selected work</SectionTitle>
        <div className="grid gap-[var(--bl)] md:grid-cols-[1fr_auto] md:items-end md:gap-[var(--lh)]">
          <p className="editorial-copy text-foreground/55">
            Protocols, creative tools, and product experiments—designed and built end to end.
          </p>
          <Link
            href="/projects"
            className="meta-label text-foreground/30 hover:text-foreground transition-colors duration-300"
          >
            Browse the full archive
          </Link>
        </div>
      </section>
      <section className="flex flex-col items-stretch pt-[var(--lh)]">
        <FeaturedWorkGraphic
          items={graphicItems}
          className="mb-[var(--bl)] hidden w-full text-[var(--ink-blue)] md:block"
        />
        <div className="-mx-[var(--margin)]">
          <ProjectCarouselWrapper cards={projectCards} />
        </div>
      </section>
    </EditorialSection>
  );
}
