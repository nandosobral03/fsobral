import GraveyardOfDeadProjects from "./graveyard-of-dead-projects/graveyard-of-dead-projects";
import LessonsFromRedoingProjects from "./lessons-from-redoing-projects/lessons-from-redoing-projects";

export type Post = {
  title: string;
  description: string;
  slug: string;
  date: string;
  components: React.ReactNode;
  subtitle?: string;
};

export const posts: Post[] = [
  {
    title: "The Graveyard of Dead Projects",
    description: "A collection of projects that I've abandoned and the reasons why, so they are not forgotten",
    slug: "graveyard-of-dead-projects",
    date: "August 04, 2024",
    components: <GraveyardOfDeadProjects />,
  },
  {
    title: "Lessons learned from redoing the same project over the years",
    description: "A look of my different iterations of the same project, why I've done it so many times, and what I've learned from it.",
    subtitle: "A nostalgic journey through my various iterations of the same project",
    slug: "lessons-from-redoing-projects",
    date: "July 31, 2024",
    components: <LessonsFromRedoingProjects />,
  },
];
