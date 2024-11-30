"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

export default function ProjectCard({ title, image, children }: ProjectCardProps) {
  return (
    <div className="shrink-0 w-[300px] md:w-[600px] md:aspect-square aspect-[2/3] flex flex-col border-[3px] border-foreground overflow-hidden transition-all duration-300 hover:bg-foreground hover:text-background group select-none pointer-events-none">
      <div className="w-full h-fit aspect-video relative">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="w-full flex flex-col p-4 overflow-hidden">
        <h3 className="font-bold font-condensed uppercase text-lg md:text-xl">
          <Link href={`/proyects/${title}`} className="flex items-center ">
            {title}
            <span className="material-symbols-outlined text-sm font-bold">north_east</span>
          </Link>
        </h3>
        <div className="h-full overflow-hidden text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
}
