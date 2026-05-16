import { automatingFishingForFunAndNoProfitSource } from "./blog-posts/automating-fishing-for-fun-and-no-profit/source";
import { eUnibusInfinitumSource } from "./blog-posts/e-unibus-infinitum/source";
import { graveyardOfDeadProjectsSource } from "./blog-posts/graveyard-of-dead-projects/source";
import { i3dPrintedMyGithubContributionHistorySource } from "./blog-posts/i-3d-printed-my-github-contribution-history/source";
import { inngestSource } from "./blog-posts/inngest/source";
import { lessonsFromRedoingProjectsSource } from "./blog-posts/lessons-from-redoing-projects/source";
import { peaksOfYoreAndTheDifficultyBoulderSource } from "./blog-posts/peaks-of-yore-and-the-difficulty-boulder/source";
import { sayingGoodbyeToMyFirstDomainSource } from "./blog-posts/saying-goodbye-to-my-first-domain/source";
import { spring84Source } from "./blog-posts/spring84/source";
import { tailwindV4Source } from "./blog-posts/tailwind-v4/source";
import { theEndlessMediaEpidemicSource } from "./blog-posts/the-end-less-media-epidemic/source";
import { createBlogPostCollection } from "./article-collection";
import type { ArticleSource } from "./article-types";

const blogPostSources = [
  spring84Source,
  lessonsFromRedoingProjectsSource,
  graveyardOfDeadProjectsSource,
  inngestSource,
  peaksOfYoreAndTheDifficultyBoulderSource,
  theEndlessMediaEpidemicSource,
  i3dPrintedMyGithubContributionHistorySource,
  tailwindV4Source,
  sayingGoodbyeToMyFirstDomainSource,
  automatingFishingForFunAndNoProfitSource,
  eUnibusInfinitumSource,
] satisfies readonly ArticleSource[];

export const blogPosts = createBlogPostCollection(blogPostSources);
