import AutomatingFishingForFunAndNoProfit from "./automating-fishing-for-fun-and-no-profit/automating-fishing-for-fun-and-no-profit";
import GraveyardOfDeadProjects from "./graveyard-of-dead-projects/graveyard-of-dead-projects";
import I3dPrintedMyGithubContributionHistory from "./i-3d-printed-my-github-contribution-history/i-3d-printed-my-github-contribution-history";
import Inngest from "./inngest/inngest";
import LessonsFromRedoingProjects from "./lessons-from-redoing-projects/lessons-from-redoing-projects";
import PeaksOfYoreAndTheDifficultyBoulder from "./peaks-of-yore-and-the-difficulty-boulder/peaks-of-yore-and-the-difficulty-boulder";
import SayingGoodbyeToMyFirstDomain from "./saying-goodbye-to-my-first-domain/saying-goodbye-to-my-first-domain";
import TailwindV4 from "./tailwind-v4/tailwind-v4";
import TheEndlessMediaEpidemic from "./the-end-less-media-epidemic/the-end-less-media-epidemic";

export type Post = {
  title: string;
  description: string;
  slug: string;
  date: string;
  components: React.ReactNode;
  subtitle?: string;
  coverImage?: string;
  hidden?: boolean;
};

export const posts: Post[] = [
  {
    title: "Lessons learned from redoing the same project over the years",
    description:
      "A look of my different iterations of the same project, why I've done it so many times, and what I've learned from it.",
    subtitle:
      "A nostalgic journey through my various iterations of the same project",
    slug: "lessons-from-redoing-projects",
    date: "June 23, 2024",
    components: <LessonsFromRedoingProjects />,
    coverImage: "/blog/covers/lessons-from-redoing-projects.png",
  },
  {
    title: "The Graveyard of Dead Projects",
    description:
      "A collection of projects that I've abandoned and the reasons why, so they are not forgotten",
    slug: "graveyard-of-dead-projects",
    date: "January 09, 2025",
    components: <GraveyardOfDeadProjects />,
    coverImage: "/blog/covers/graveyard-of-dead-projects.png",
  },
  {
    title: "Inngest: A better way to handle background jobs in serverless",
    description:
      "Checking out how to use Inngest to solve problems that usually aren't even problems for non-serverless environments (and a small rant about Streak)",
    subtitle:
      "My experience solving problems that are usually trivial in other developer workflows, also I hate Streak and I want you to hate it too",
    slug: "inngest",
    date: "September 17, 2024",
    components: <Inngest />,
    coverImage: "/blog/covers/inngest.png",
  },
  {
    title: "Peaks of Yore and the Difficulty Boulder",
    description:
      "A look into one of my favorite games and how it handles difficulty",
    slug: "peaks-of-yore-and-the-difficulty-boulder",
    date: "December 02, 2024",
    components: <PeaksOfYoreAndTheDifficultyBoulder />,
    coverImage: "/blog/covers/peaks-of-yore-and-the-difficulty-boulder.png",
  },
  {
    title: "The Endless Media Epidemic",
    description:
      "An examination of how we've become so complacent with our media consumption and how it's affecting us",
    slug: "the-endless-media-epidemic",
    date: "February 20, 2025",
    components: <TheEndlessMediaEpidemic />,
    coverImage: "/blog/covers/the-endless-media-epidemic.png",
  },
  {
    title: "I 3D printed my Github contribution history",
    description:
      "A memento of a year's worth of coding efforts, both during and outside of work.",
    slug: "i-3d-printed-my-github-contribution-history",
    date: "March 13, 2025",
    components: <I3dPrintedMyGithubContributionHistory />,
    coverImage: "/blog/covers/i-3d-printed-my-github-contribution-history.png",
  },
  {
    title: "Tailwind v4: Releasing a major update in the age of AI",
    description:
      "I had to write a blog about the new features in Tailwind CSS v4 so derailled it by going on tangents about the unique challenges of releasing big changes in the age of AI assisted coding.",
    slug: "tailwind-v4",
    date: "March 27, 2025",
    components: <TailwindV4 />,
    coverImage: "/blog/covers/tailwind-v4.png",
  },
  {
    title: "Saying goodbye to my first domain",
    description:
      "Reflecting on the journey with my first domain and the bittersweet process of moving on, including the technical and emotional lessons learned along the way.",
    slug: "saying-goodbye-to-my-first-domain",
    date: "May 01, 2025",
    components: <SayingGoodbyeToMyFirstDomain />,
    coverImage: "/blog/covers/saying-goodbye-to-my-first-domain.png",
  },
  {
    title: "Automating fishing for fun and no profit",
    description:
      "I decided to automate a fishing game because I wanted to automate something, it was fun",
    slug: "automating-fishing-for-fun-and-no-profit",
    date: "June 22, 2025",
    components: <AutomatingFishingForFunAndNoProfit />,
    coverImage: "/blog/covers/automating-fishing-for-fun-and-no-profit.jpeg",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
