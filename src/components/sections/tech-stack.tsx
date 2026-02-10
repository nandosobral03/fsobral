"use client";

import SectionTitle from "@/components/common/section-title";
import { motion } from "motion/react";

export default function TechStack() {
  const mainStack = ["React", "TypeScript", "Node.js", "Express", "Next.js", "tRPC"];
  const alsoInterestedIn = ["Rust", "Python", "Svelte", "TanStack Start"];

  return (
    <section className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-6 relative">
      <SectionTitle>Tech Stack</SectionTitle>

      <div className="flex flex-col gap-4 mt-2">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <p className="meta-label mb-2 text-background">Main Stack</p>
          <div className="flex flex-wrap gap-2">
            {mainStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 border-2 border-background bg-background text-foreground font-condensed font-semibold text-sm hover:border-background/50 hover:bg-background/80 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <p className="meta-label mb-2 text-background/70">Also Interested In</p>
          <div className="flex flex-wrap gap-2">
            {alsoInterestedIn.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 border-2 border-background/30 bg-foreground text-background/70 font-condensed font-semibold text-sm hover:border-background/50 hover:text-background transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
