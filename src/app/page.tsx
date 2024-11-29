import React, { Suspense } from "react";
import AboutMe from "@/components/sections/about-me";
import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import Spinner from "@/components/common/spinner";
import GithubActivityServer from "@/components/github-activity-server";

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
      <div className="w-full flex items-stretch">
        <Projects />
        <div className="w-1/2">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <GithubActivityServer />
          </Suspense>
        </div>
      </div>

      <Divider />
    </>
  );
}
