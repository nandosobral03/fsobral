"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
  year: number;
  variant?: "grid" | "carousel";
}

export default function ProjectCard({ title, image, children, year, variant = "carousel" }: ProjectCardProps) {
  const widthClass = variant === "grid"
    ? "w-full"
    : "w-[280px] md:w-[420px]";

  return (
    <Link href={`/projects/${title}`} draggable={false} className={`${widthClass} h-[420px] md:h-[480px] flex flex-col bg-foreground text-background group select-none overflow-hidden`}>
      <div className="w-full aspect-video relative overflow-hidden">
        <Image src={image} alt={title} fill style={{ objectFit: "cover" }} className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="w-full h-px bg-background/10" />
      <div className="flex flex-col gap-2 p-4 md:p-5 flex-1">
        <div className="flex items-baseline justify-between">
          <h3 className="font-bold font-condensed uppercase text-lg md:text-2xl text-background">{title}</h3>
          <span className="meta-label text-accent/60">{year}</span>
        </div>
        <p className="font-serif text-sm md:text-base leading-relaxed text-background/50">{children}</p>
      </div>
    </Link>
  );
}
