"use client";

import { Fragment } from "react";
import LargeTitle from "@/components/common/large-title";
import { projects } from "@/content";
import ProjectsInfo from "./projects-info";
import ProjectsByYear from "./projects-by-year";
import { motion } from "motion/react";

export default function Home() {
  const projectYears = projects.years();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <LargeTitle
          alt="AORNUM"
          variant="page"
          textClassName="text-[10vw] xl:text-[7rem]"
          backgroundImage="/images/sisyphus.png"
          backgroundImageFallback={{
            desktop: "/images/sisyphus-ascii-desktop.png",
            mobile: "/images/sisyphus-ascii-mobile.png",
          }}
        >
          PROJECTS
        </LargeTitle>
      </motion.div>

      <ProjectsInfo />

      <div className="structural-line" />

      {projectYears.map((projectYear, index) => (
        <Fragment key={projectYear.year}>
          {index > 0 && <div className="structural-line" />}
          <ProjectsByYear projectYear={projectYear} />
        </Fragment>
      ))}
    </>
  );
}
