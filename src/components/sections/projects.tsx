"use client";

import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import ProjectCarouselWrapper from "./project-carusel-wrapper";
import Link from "next/link";
import { motion } from "motion/react";

export default function Projects() {
  return (
    <div className="w-full flex flex-col items-stretch px-6">
      <section className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <SectionTitle index="02">Projects</SectionTitle>
          <motion.div whileHover={{ scale: 1.1, rotate: 45 }} transition={{ type: "spring", stiffness: 400 }}>
            <Link href="/projects" className="inline-flex group">
              <span className="material-symbols-outlined text-4xl my-auto text-foreground/40 group-hover:text-accent transition-colors duration-300">north_east</span>
            </Link>
          </motion.div>
        </div>
        <SectionDescription>
          I enjoy working on various projects, either because I want to build something I want to use, I want to learn something by building with it or simply because an idea popped into my head and I had to make it a reality. I like to
          write a small post-mortem writeup about what I did, why and how
        </SectionDescription>
      </section>
      <section className="w-full flex flex-col items-stretch pt-12">
        <motion.div className="-mx-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <ProjectCarouselWrapper />
        </motion.div>
      </section>
    </div>
  );
}
