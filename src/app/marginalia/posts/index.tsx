import TwentyTwentyFive from "./2025/2025";
import Favorites from "./favorites/favorites";

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
];

export const marginaliaPosts: MarginaliaPost[] = basePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
