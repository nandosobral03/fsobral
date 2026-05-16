import { twentyTwentyFiveSource } from "./marginalia-posts/2025/source";
import { changelogSource } from "./marginalia-posts/changelog/source";
import { favoritesSource } from "./marginalia-posts/favorites/source";
import { spring84SpecSource } from "./marginalia-posts/spring84-spec/source";
import { createMarginaliaCollection } from "./article-collection";
import type { ArticleSource } from "./article-types";

const marginaliaSources = [
  spring84SpecSource,
  favoritesSource,
  twentyTwentyFiveSource,
  changelogSource,
] satisfies readonly ArticleSource[];

export const marginaliaPosts = createMarginaliaCollection(marginaliaSources);
