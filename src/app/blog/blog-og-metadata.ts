type BlogOgMetadata = {
  slug: string;
  title: string;
  description: string;
  subtitle?: string;
};

export const blogOgMetadata: readonly BlogOgMetadata[] = [
  {
    slug: "automating-fishing-for-fun-and-no-profit",
    title: "Automating fishing for fun and no profit",
    description: "I decided to automate a fishing game because I wanted to automate something, it was fun",
  },
  {
    slug: "e-unibus-infinitum",
    title: "E Unibus Infinitum",
    description:
      "David Foster Wallace's E Unibus Pluram: was published in 1993, but is more relevant than ever today.",
  },
  {
    slug: "graveyard-of-dead-projects",
    title: "The Graveyard of Dead Projects",
    description: "A collection of projects that I've abandoned and the reasons why, so they are not forgotten",
  },
  {
    slug: "i-3d-printed-my-github-contribution-history",
    title: "I 3D printed my GitHub contribution history",
    description: "A memento of a year's worth of coding efforts, both during and outside of work.",
  },
  {
    slug: "inngest",
    title: "Inngest: A better way to handle background jobs in serverless",
    subtitle:
      "My experience solving problems that are usually trivial in other developer workflows, also I hate Streak and I want you to hate it too",
    description:
      "Checking out how to use Inngest to solve problems that usually aren't even problems for non-serverless environments (and a small rant about Streak)",
  },
  {
    slug: "lessons-from-redoing-projects",
    title: "Lessons learned from redoing the same project over the years",
    subtitle: "A nostalgic journey through my various iterations of the same project",
    description:
      "A look at my different iterations of the same project, why I've done it so many times, and what I've learned from it.",
  },
  {
    slug: "peaks-of-yore-and-the-difficulty-boulder",
    title: "Peaks of Yore and the Difficulty Boulder",
    description: "A look into one of my favorite games and how it handles difficulty",
  },
  {
    slug: "saying-goodbye-to-my-first-domain",
    title: "Saying goodbye to my first domain",
    description:
      "Reflecting on the journey with my first domain and the bittersweet process of moving on, including the technical and emotional lessons learned along the way.",
  },
  {
    slug: "spring84",
    title: "Specifying Spring '84",
    subtitle: "A friendly critique, a second pass, and a tiny protocol one year later",
    description:
      "A follow-up to my Spring '83 implementation: specifying a small successor protocol for expressive, self-certifying web boards.",
  },
  {
    slug: "tailwind-v4",
    title: "Tailwind v4: Releasing a major update in the age of AI",
    description:
      "I had to write a blog about the new features in Tailwind CSS v4 so I derailed it by going on tangents about the unique challenges of releasing big changes in the age of AI assisted coding.",
  },
  {
    slug: "the-end-less-media-epidemic",
    title: "The Endless Media Epidemic",
    description: "An examination of how we've become so complacent with our media consumption and how it's affecting us",
  },
] as const;
