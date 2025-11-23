"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
  year: number;
  variant?: "grid" | "carousel";
}

export default function ProjectCard({ title, image, children, year, variant = "carousel" }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = variant === "grid"
    ? "w-full aspect-[4/5]"
    : "w-[300px] md:w-[600px] md:aspect-square aspect-2/3";

  return (
    <motion.div
      className={`${sizeClasses} flex flex-col border-[3px] border-foreground hover:border-accent overflow-hidden transition-all duration-300 hover:bg-foreground hover:text-background group select-none relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="absolute inset-0 bg-accent opacity-0 pointer-events-none" animate={{ opacity: isHovered ? 0.08 : 0 }} transition={{ duration: 0.3 }} />

      <Link href={`/projects/${title}`}>
        <div className="w-full h-fit aspect-video relative overflow-hidden">
          <Image src={image} alt={title} fill style={{ objectFit: "cover" }} className="transition-transform duration-500 hover:scale-110" />
          <motion.div
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center z-10"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -45 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="material-symbols-outlined text-background text-sm">north_east</span>
          </motion.div>
        </div>
      </Link>
      <div className="w-full flex flex-col p-4 overflow-hidden relative z-10">
        <h3 className="font-bold font-condensed uppercase text-lg md:text-2xl mb-2">
          <Link href={`/projects/${title}`} className="flex items-center gap-2 group-hover:text-background transition-colors">
            {title}
            <span className="text-xs opacity-50 group-hover:text-accent transition-colors">({year})</span>
          </Link>
        </h3>

        <div className="h-full overflow-hidden text-sm md:text-base leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}
