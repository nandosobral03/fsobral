import AboutMe from "@/components/sections/about-me";
import LargeTitle from "@/components/common/large-title";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import ContactMe from "@/components/sections/contact-me";
import GithubActivityServer from "@/components/gh-activity/gh-activity-server";
import { EditorialGrid, EditorialSection, StructuralRule } from "@/components/common/editorial";
import Link from "next/link";
import { Suspense } from "react";
import GhActivitySkeleton from "@/components/gh-activity/gh-activity-skeleton";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport height */}
      <div className="relative">
        <LargeTitle
          alt="ABOUT ME"
          artworkGraphic="creation-datum"
          backgroundImage="/images/creation-hands.webp"
          textClassName="text-[15vw] md:text-[min(8vw,5.4rem)]"
          backgroundImageFallback={{
            desktop: "/images/creation-hands-ascii-desktop.webp",
            mobile: "/images/creation-hands-ascii-mobile.webp",
          }}
        >FERNANDO SOBRAL</LargeTitle>
        <EditorialSection tone="ink" className="border-t border-background/10">
          <EditorialGrid className="[row-gap:calc(var(--bl)*2)] py-[calc(var(--bl)*2)] md:[row-gap:var(--lh)] md:py-[calc(var(--lh)*1.5)]">
            <div className="[grid-column:1/-1] flex flex-col gap-1 md:[grid-column:1/4]">
              <span className="meta-label text-accent">Senior software engineer</span>
              <span className="meta-label on-ink-meta">Montevideo, Uruguay</span>
            </div>

            <div className="[grid-column:1/-1] grid grid-cols-2 gap-x-4 md:[grid-column:10/13] md:flex md:flex-col md:gap-0">
              <Link
                href="#about"
                className="group flex items-center justify-between border-b border-background/25 py-2 text-background/70 transition-colors hover:border-accent hover:text-background"
              >
                <span className="meta-label">About</span>
                <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-y-0.5">↓</span>
              </Link>
              <Link
                href="#selected-work"
                className="group flex items-center justify-between border-b border-background/25 py-2 text-background/70 transition-colors hover:border-accent hover:text-background"
              >
                <span className="meta-label">Selected work</span>
                <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-y-0.5">↓</span>
              </Link>
            </div>
          </EditorialGrid>
        </EditorialSection>
        <div className="pointer-events-none absolute left-[var(--margin)] top-[var(--lh)] z-20 hidden w-32 text-[var(--ink-blue)] xl:block">
          <div className="flex items-center gap-2">
            <span className="meta-label text-accent">01</span>
            <span className="h-px flex-1 bg-foreground/30" />
          </div>
          <span className="meta-label mt-1 block text-foreground/45">Portfolio / intro</span>
        </div>
      </div>

      <EditorialSection tone="ink">
        <EditorialGrid className="py-[calc(var(--lh)*2)]">
          <AboutMe />
          <TechStack />
        </EditorialGrid>
        <div className="h-px bg-background/15" />
        <div className="py-[var(--lh)]">
          <Suspense fallback={<GhActivitySkeleton />}>
            <GithubActivityServer />
          </Suspense>
        </div>
      </EditorialSection>

      <StructuralRule />

      {/* Projects Section */}
      <div className="section-gap">
        <Projects />
      </div>

      <StructuralRule />

      {/* Blog Section */}
      <div className="section-gap">
        <Blog />
      </div>

      {/* Contact / Footer */}
      <ContactMe />
    </>
  );
}
