"use client";

import { motion } from "motion/react";

export default function SectionDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="text-base md:text-lg font-light text-pretty leading-relaxed font-serif"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
