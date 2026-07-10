"use client";

import Image from "next/image";
import ViewTransitionLink from "@/components/common/view-transition-link";

interface ProjectCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
  year: number;
  href: string;
  variant?: "grid" | "carousel";
  routeLayer?: boolean;
}

export default function ProjectCard({ title, image, children, year, href, variant = "carousel", routeLayer = false }: ProjectCardProps) {
  const widthClass = variant === "grid"
    ? "w-full"
    : "w-[280px] md:w-[420px]";
  const heightClass = variant === "grid"
    ? "h-[360px] md:h-[390px]"
    : "h-[420px] md:h-[480px]";

  return (
    <ViewTransitionLink
      href={href}
      routeLayer={routeLayer}
      scroll={routeLayer ? false : undefined}
      draggable={false}
      className={`${widthClass} ${heightClass} flex flex-col bg-foreground text-background group select-none overflow-hidden`}
    >
      <div className="w-full aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes={variant === "grid" ? "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw" : "(max-width: 767px) 280px, 420px"}
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="w-full h-px bg-background/10" />
      <div className="flex flex-col gap-2 p-4 md:p-5 flex-1">
        <div className="flex items-baseline justify-between">
          <h3 className="display-title text-lg md:text-2xl text-background">{title}</h3>
          <span className="meta-label text-accent">{year}</span>
        </div>
        <p className={`editorial-copy text-sm md:text-base text-background/65 ${variant === "grid" ? "line-clamp-4" : "line-clamp-5"}`}>{children}</p>
      </div>
    </ViewTransitionLink>
  );
}
