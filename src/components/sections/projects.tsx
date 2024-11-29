import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import { Suspense } from "react";
import Spinner from "../common/spinner";
import GithubActivityServer from "../gh-activity/gh-activity-server";
import dynamic from "next/dist/shared/lib/dynamic";
import ProjectCarouselNoSSR from "./project-carusel-wrapper";

export default function Projects() {
  return (
    <div className="w-full flex flex-col items-stretch p-6 ">
      <section className="w-full flex items-stretch">
        <div className="w-1/2 flex flex-col gap-4">
          <SectionTitle>Projects</SectionTitle>
          <SectionDescription>
            I enjoy working on various projects, either because I want to build something I want to use, I want learn something by building with it or simply because an idea popped into my head and I had to make it a reality. I like to
            write a small post-natus writeup about what I did, why and how
          </SectionDescription>
        </div>
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
      </section>
      <section className="w-full flex flex-col items-stretch pt-4">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            </div>
          }
        >
          <ProjectCarouselNoSSR />
        </Suspense>
      </section>
    </div>
  );
}
