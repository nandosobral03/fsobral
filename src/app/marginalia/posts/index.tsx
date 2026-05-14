import TwentyTwentyFive from "./2025/2025";
import Favorites from "./favorites/favorites";
import Changelog from "./changelog/changelog";
import Spring84Spec from "./spring84-spec/spring84-spec";

export type MarginaliaPost = {
  title: string;
  description: string;
  slug: string;
  date: string;
  components: React.ReactNode;
  tags?: string[];
};

const basePosts: MarginaliaPost[] = [
  {
    title: "Spring '84 Specification",
    description: "A compact draft specification for small, expressive, self-certifying web boards",
    slug: "spring84-spec",
    date: "May 14, 2026",
    components: <Spring84Spec />,
    tags: [],
  },
  {
    title: "Favorites",
    description: "Web finds and selected prints worth remembering",
    slug: "favorites",
    date: "August 20, 2025",
    components: <Favorites />,
    tags: [],
  },
  {
    title: "2025",
    description: "A short look back at the year",
    slug: "2025",
    date: "December 26, 2025",
    components: <TwentyTwentyFive />,
    tags: [],
  },
  {
    title: "Changelog",
    description: "A high-level overview of updates to this site",
    slug: "changelog",
    date: "March 28, 2026",
    components: <Changelog />,
    tags: [],
  },
];

export const marginaliaPosts: MarginaliaPost[] = basePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
