"use client";

import AboutMe from "@/components/sections/about-me";
import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import ContactMe from "@/components/sections/contact-me";
import GithubActivityClient from "@/components/gh-activity/gh-activity-client";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport height */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
        <LargeTitle alt="ABOUT ME" backgroundImage="/images/creation-hands.jpg">FERNANDO SOBRAL</LargeTitle>
      </motion.div>

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
          <GithubActivityClient />
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
