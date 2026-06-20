import ProjectCarousel from "./project-carusel";
import type { ProjectCardEntry } from "@/content";

export default function ProjectCarouselWrapper({
  cards,
}: {
  cards: readonly ProjectCardEntry[];
}) {
  return <ProjectCarousel cards={cards} />;
}
