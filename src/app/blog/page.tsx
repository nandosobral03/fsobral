import FadeIn from "@/components/common/fade-in";
import LargeTitle from "@/components/common/large-title";
import { blogPosts, marginaliaPosts } from "@/content";
import BlogIndexClient from "./blog-index-client";

export default function Home() {
  const visiblePosts = blogPosts.cardEntries();
  const visibleMarginalia = marginaliaPosts.cardEntries();

  return (
    <>
      <FadeIn className="mb-8">
        <LargeTitle
          alt="IPSUM"
          variant="page"
          backgroundImage="/images/thinker.png"
          backgroundImageContrast={1.2}
          backgroundImageFallback={{
            desktop: "/images/thinker-ascii-desktop.png",
            mobile: "/images/thinker-ascii-mobile.png",
          }}
        >
          BLOG
        </LargeTitle>
      </FadeIn>

      <BlogIndexClient posts={visiblePosts} marginaliaPosts={visibleMarginalia} />
    </>
  );
}
