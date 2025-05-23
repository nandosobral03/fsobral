"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
  year: number;
}

export default function ProjectCard({ title, image, children, year }: ProjectCardProps) {
  return (
    <div className="shrink-0 w-[300px] md:w-[600px] md:aspect-square aspect-[2/3] flex flex-col border-[3px] border-foreground overflow-hidden transition-all duration-300 hover:bg-foreground hover:text-background group select-none">
      <Link href={`/projects/${title}`}>
        <div className="w-full h-fit aspect-video relative">
          <Image src={image} alt={title} fill objectFit="cover" />
        </div>
      </Link>
      <div className="w-full flex flex-col p-4 overflow-hidden">
        <h3 className="font-bold font-condensed uppercase text-lg md:text-xl">
          <Link href={`/projects/${title}`} className="flex items-center gap-2">
            {title}
            <span className="text-sm opacity-50">({year})</span>
            <span className="material-symbols-outlined text-sm font-bold">north_east</span>
          </Link>
        </h3>

        <div className="h-full overflow-hidden text-sm md:text-lg">{children}</div>
      </div>
    </div>
  );
}
