"use client";

import SectionTitle from "@/components/common/section-title";
import ProjectCarouselWrapper from "./project-carusel-wrapper";
import Link from "next/link";
import { motion } from "motion/react";

export default function Projects() {
  return (
    <div className="w-full flex flex-col items-stretch px-6">
      <section className="w-full flex flex-col gap-3">
        <SectionTitle index="02">Projects</SectionTitle>
        <div className="flex items-baseline justify-between">
          <p className="font-serif text-foreground/50">
            I like building things
          </p>
          <Link
            href="/projects"
            className="meta-label text-foreground/40 hover:text-foreground transition-colors duration-300"
          >
            View all
          </Link>
        </div>
      </section>
      <section className="w-full flex flex-col items-stretch pt-5">
        <motion.div
          className="-mx-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectCarouselWrapper />
        </motion.div>
      </section>
    </div>
  );
}
