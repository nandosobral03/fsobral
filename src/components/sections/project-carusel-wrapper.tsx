"use client";

import dynamic from "next/dist/shared/lib/dynamic";

const ProjectCarousel = dynamic(() => import("./project-carusel"), {
  ssr: false,
});

export default function ProjectCarouselNoSSR() {
  return <ProjectCarousel />;
}
