import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { postEntries, type PostMetadata } from "../posts-data";

const AutomatingFishingForFunAndNoProfit = dynamic(() => import("./automating-fishing-for-fun-and-no-profit/automating-fishing-for-fun-and-no-profit"));
const EUnibusInfinitum = dynamic(() => import("./e-unibus-infinitum/e-unibus-infinitum"));
const GraveyardOfDeadProjects = dynamic(() => import("./graveyard-of-dead-projects/graveyard-of-dead-projects"));
const I3dPrintedMyGithubContributionHistory = dynamic(() => import("./i-3d-printed-my-github-contribution-history/i-3d-printed-my-github-contribution-history"));
const Inngest = dynamic(() => import("./inngest/inngest"));
const LessonsFromRedoingProjects = dynamic(() => import("./lessons-from-redoing-projects/lessons-from-redoing-projects"));
const PeaksOfYoreAndTheDifficultyBoulder = dynamic(() => import("./peaks-of-yore-and-the-difficulty-boulder/peaks-of-yore-and-the-difficulty-boulder"));
const SayingGoodbyeToMyFirstDomain = dynamic(() => import("./saying-goodbye-to-my-first-domain/saying-goodbye-to-my-first-domain"));
const Spring84 = dynamic(() => import("./spring84/spring84"));
const TailwindV4 = dynamic(() => import("./tailwind-v4/tailwind-v4"));
const TheEndlessMediaEpidemic = dynamic(() => import("./the-end-less-media-epidemic/the-end-less-media-epidemic"));

export type Post = PostMetadata & {
  components: React.ReactNode;
};

const componentsBySlug: Record<string, ComponentType> = {
  "automating-fishing-for-fun-and-no-profit": AutomatingFishingForFunAndNoProfit,
  "e-unibus-infinitum": EUnibusInfinitum,
  "graveyard-of-dead-projects": GraveyardOfDeadProjects,
  "i-3d-printed-my-github-contribution-history": I3dPrintedMyGithubContributionHistory,
  inngest: Inngest,
  "lessons-from-redoing-projects": LessonsFromRedoingProjects,
  "peaks-of-yore-and-the-difficulty-boulder": PeaksOfYoreAndTheDifficultyBoulder,
  "saying-goodbye-to-my-first-domain": SayingGoodbyeToMyFirstDomain,
  spring84: Spring84,
  "tailwind-v4": TailwindV4,
  "the-endless-media-epidemic": TheEndlessMediaEpidemic,
};

export const posts: Post[] = postEntries.map((metadata) => {
  const Component = componentsBySlug[metadata.slug];
  if (!Component) {
    throw new Error(`Missing blog post component for slug: ${metadata.slug}`);
  }
  return { ...metadata, components: <Component /> };
});

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getVisiblePosts() {
  return posts.filter((post) => !post.hidden);
}
