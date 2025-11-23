"use client";

import SectionTitle from "@/components/common/section-title";
import { motion } from "motion/react";

export default function TechStack() {
  const mainStack = ["React", "TypeScript", "Node.js", "Express", "Next.js", "tRPC"];
  const alsoInterestedIn = ["Rust", "Python", "Svelte", "TanStack Start"];

  return (
    <section className="w-full md:w-1/2 p-6 flex flex-col gap-6 relative">
      <SectionTitle>Tech Stack</SectionTitle>

      <div className="flex flex-col gap-4 mt-2">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <p className="text-xs uppercase tracking-wider font-condensed font-bold mb-2 text-background">Main Stack</p>
          <div className="flex flex-wrap gap-2">
            {mainStack.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 border-2 border-background bg-background text-foreground font-condensed font-semibold text-sm hover:bg-accent hover:border-accent hover:text-background hover:scale-110 transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <p className="text-xs uppercase tracking-wider font-condensed font-bold mb-2 text-accent">Also Interested In</p>
          <div className="flex flex-wrap gap-2">
            {alsoInterestedIn.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 border-2 border-accent bg-foreground text-accent font-condensed font-semibold text-sm hover:bg-accent hover:text-background hover:scale-110 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
