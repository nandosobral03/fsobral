"use client";

import AboutMe from "@/components/sections/about-me";
import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import ContactMe from "@/components/sections/contact-me";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      {/* Hero Section - Give it space to breathe */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mb-20">
        <LargeTitle alt="ABOUT ME">FERNANDO SOBRAL</LargeTitle>
      </motion.div>

      {/* About Section - Unified split layout with dark background */}
      <div className="w-full bg-foreground text-background">
        <div className="w-full flex flex-col md:flex-row items-stretch mx-auto">
          <AboutMe />
          <Divider orientation="vertical" className="hidden md:block bg-background" />
          <Divider orientation="horizontal" className="md:hidden bg-background" />
          <TechStack />
        </div>
      </div>

      {/* Projects Section - Full bleed */}
      <Projects />

      {/* Visual separator with accent */}
      <Divider />
      {/* Blog Section */}
      <Blog />

      <Divider />

      {/* Contact Section - Final CTA */}
      <ContactMe />
    </>
  );
}
