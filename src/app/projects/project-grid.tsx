"use client";

import ProjectCard from "@/components/sections/project-card";
import type { ProjectCardEntry } from "@/content";
import { motion } from "motion/react";

export function ProjectGrid({ cards }: { cards: readonly ProjectCardEntry[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: (index % 2) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            <ProjectCard {...card} variant="grid">
              {card.description}
            </ProjectCard>
          </motion.div>
        );
      })}
    </div>
  );
}
