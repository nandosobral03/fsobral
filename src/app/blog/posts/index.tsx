import GraveyardOfDeadProjects from "./graveyard-of-dead-projects/graveyard-of-dead-projects";
import Inngest from "./inngest/inngest";
import LessonsFromRedoingProjects from "./lessons-from-redoing-projects/lessons-from-redoing-projects";
import PeaksOfYoreAndTheDifficultyBoulder from "./peaks-of-yore-and-the-difficulty-boulder/peaks-of-yore-and-the-difficulty-boulder";

export type Post = {
  title: string;
  description: string;
  slug: string;
  date: string;
  components: React.ReactNode;
  subtitle?: string;
  coverImage?: string;
};

export const posts: Post[] = [
  {
    title: "Lessons learned from redoing the same project over the years",
    description: "A look of my different iterations of the same project, why I've done it so many times, and what I've learned from it.",
    subtitle: "A nostalgic journey through my various iterations of the same project",
    slug: "lessons-from-redoing-projects",
    date: "June 23, 2024",
    components: <LessonsFromRedoingProjects />,
    coverImage: "/blog/covers/lessons-from-redoing-projects.png",
  },
  {
    title: "The Graveyard of Dead Projects",
    description: "A collection of projects that I've abandoned and the reasons why, so they are not forgotten",
    slug: "graveyard-of-dead-projects",
    date: "January 09, 2025",
    components: <GraveyardOfDeadProjects />,
    coverImage: "/blog/covers/graveyard-of-dead-projects.png",
  },
  {
    title: "Inngest: A better way to handle background jobs in serverless",
    description: "A look at how to use Inngest to solve problems that usually aren't even problems for non-serverless environments",
    subtitle: "My experience solving problems that are usually trivial in other developer workflows, also I hate Streak and I want you to hate it too",
    slug: "inngest",
    date: "September 17, 2024",
    components: <Inngest />,
    coverImage: "/blog/covers/inngest.png",
  },
  {
    title: "Peaks of Yore and the Difficulty Boulder",
    description: "A look into one of my favorite games and how it handles difficulty",
    slug: "peaks-of-yore-and-the-difficulty-boulder",
    date: "December 02, 2024",
    components: <PeaksOfYoreAndTheDifficultyBoulder />,
    coverImage: "/blog/covers/peaks-of-yore-and-the-difficulty-boulder.png",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
