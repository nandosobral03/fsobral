import AboutMe from "@/components/sections/about-me";
import FadeIn from "@/components/common/fade-in";
import LargeTitle from "@/components/common/large-title";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import ContactMe from "@/components/sections/contact-me";
import GithubActivityServer from "@/components/gh-activity/gh-activity-server";
import { EditorialGrid, EditorialSection, StructuralRule } from "@/components/common/editorial";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport height */}
      <FadeIn>
        <LargeTitle
          alt="ABOUT ME"
          backgroundImage="/images/creation-hands.png"
          backgroundImageFallback={{
            desktop: "/images/creation-hands-ascii-desktop.png",
            mobile: "/images/creation-hands-ascii-mobile.png",
          }}
        >FERNANDO SOBRAL</LargeTitle>
      </FadeIn>

      <StructuralRule />

      <EditorialSection tone="ink">
        <EditorialGrid className="py-[calc(var(--lh)*2)]">
          <AboutMe />
          <TechStack />
        </EditorialGrid>
        <div className="h-px bg-background/15" />
        <div className="py-[var(--lh)]">
          <GithubActivityServer />
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
