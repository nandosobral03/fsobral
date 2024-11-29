import React, { Suspense } from "react";
import AboutMe from "@/components/sections/about-me";
import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <LargeTitle>FERNANDO SOBRAL</LargeTitle>
      <Divider />
      <div className="w-full flex items-stretch">
        <AboutMe />
        <Divider orientation="vertical" />
        <TechStack />
      </div>
      <Divider />
      <Projects />

      <Divider />
    </>
  );
}
