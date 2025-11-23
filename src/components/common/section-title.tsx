"use client";

import { motion } from "motion/react";

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      className="text-3xl md:text-5xl font-bold font-condensed uppercase tracking-wide relative inline-block group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative z-10">{children}</span>
    </motion.h2>
  );
}
