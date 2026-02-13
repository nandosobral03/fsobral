import AboutMe from "@/components/sections/about-me";
import Divider from "@/components/common/divider";
import FadeIn from "@/components/common/fade-in";
import LargeTitle from "@/components/common/large-title";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import ContactMe from "@/components/sections/contact-me";
import GithubActivityServer from "@/components/gh-activity/gh-activity-server";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport height */}
      <FadeIn>
        <LargeTitle alt="ABOUT ME" backgroundImage="/images/creation-hands.png">FERNANDO SOBRAL</LargeTitle>
      </FadeIn>

      <div className="structural-line" />

      {/* About Section - Unified split layout with dark background */}
      <div className="w-full bg-foreground text-background">
        <div className="w-full flex flex-col md:flex-row items-stretch mx-auto">
          <AboutMe />
          <Divider orientation="vertical" className="hidden md:block bg-background" />
          <Divider orientation="horizontal" className="md:hidden bg-background" />
          <TechStack />
        </div>
        <div className="h-px bg-background/15 mx-8 md:mx-12" />
        <div className="px-8 md:px-12 pt-6 md:pt-8 pb-8 md:pb-10">
          <GithubActivityServer vertical />
        </div>
      </div>

      <div className="structural-line" />

      {/* Projects Section */}
      <div className="section-gap">
        <Projects />
      </div>

      <div className="structural-line" />

      {/* Blog Section */}
      <div className="section-gap">
        <Blog />
      </div>

      {/* Contact / Footer */}
      <ContactMe />
    </>
  );
}
