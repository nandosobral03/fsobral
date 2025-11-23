"use client";

import LargeTitle from "@/components/common/large-title";
import ProjectsInfo from "./projects-info";
import ProjectsByYear from "./projects-by-year";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mb-20">
        <LargeTitle alt="AORNUM">PROJECTS</LargeTitle>
      </motion.div>

      <ProjectsInfo />

      <ProjectsByYear
        year={2025}
        preface={
          <>
            <div className="mb-4 pl-6 border-l-4 border-accent/50 italic text-lg">"I'm really in pursuit of greatness. I want to be one of the greats, inspired by the greats — and I want to be up there."</div>
            In 2025, the focus shifts from depth to excellence. I want to tackle harder, more challenging projects that push me beyond my comfort zone — projects that demand I finish the complex last 20% instead of settling for "good
            enough."
            <br />
            <br />
            The goal: build fewer things, but take my time to refine them, learn deep not broad.
          </>
        }
      />

      <ProjectsByYear
        year={2024}
        preface={
          <>
            In 2024, I shifted from exploration to mastery. Instead of learning a little about everything, I doubled down on a core stack: React, Next.js, and tRPC.
            <br />
            <br />
            The mentality stayed the same — build for the sake of building — but with a new constraint: spend more time on fewer projects, polish them properly, and learn the technology deeply rather than broadly.
          </>
        }
      />

      <ProjectsByYear
        year={2023}
        preface={
          <>
            In 2023, I went wide. I learned as many technologies and frameworks as I could, building a broad understanding of the web development ecosystem. The goal was simple: just build stuff. Lots of small projects, mostly for myself
            and friends.
            <br />
            <br />
            About halfway through the year, I found{" "}
            <Link href="https://ntietz.com/blog/write-more-useless-software/" className="underline text-accent" target="_blank">
              this blog post
            </Link>{" "}
            by Nick Tietz that resonated deeply. Who cares if you build something no one uses? Who cares if you write something no one reads? The point is to build for the joy of building, for the satisfaction that comes with creating
            something from nothing.
          </>
        }
      />
    </>
  );
}
