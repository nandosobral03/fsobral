import LargeTitle from "@/components/common/large-title";
import { blogPosts, marginaliaPosts } from "@/content";
import BlogIndexClient from "./blog-index-client";

export default function Home() {
  const visiblePosts = blogPosts.cardEntries();
  const visibleMarginalia = marginaliaPosts.cardEntries();

  return (
    <>
      <LargeTitle
        alt="IPSUM"
        artworkGraphic="thinker-annotation"
        variant="page"
        textClassName="text-[10vw] xl:text-[7rem]"
        backgroundImage="/images/thinker.png"
        backgroundImageContrast={1.2}
        backgroundImageFallback={{
          desktop: "/images/thinker-ascii-desktop.png",
          mobile: "/images/thinker-ascii-mobile.png",
        }}
      >
        BLOG
      </LargeTitle>

      <BlogIndexClient posts={visiblePosts} marginaliaPosts={visibleMarginalia} />
    </>
  );
}
