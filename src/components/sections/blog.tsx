import { BlogPost } from "@/app/blog/components/blog-post";
import { blogPosts } from "@/content";
import SectionTitle from "@/components/common/section-title";
import Link from "next/link";
import { EditorialSection } from "@/components/common/editorial";

export default function Blog() {
  const [latestPost] = blogPosts.cardEntries();

  return (
    <EditorialSection>
      <div className="flex flex-col gap-[var(--bl)]">
      <SectionTitle index="03">Blog</SectionTitle>
      <div className="flex items-baseline justify-between gap-[var(--lh)] mb-[var(--bl)]">
        <p className="editorial-copy text-foreground/55">
          Writing about a bit of everything
        </p>
        <Link
          href="/blog"
          className="meta-label text-foreground/30 hover:text-foreground transition-colors duration-300"
        >
          View all
        </Link>
      </div>
      <div>
        {latestPost && <BlogPost post={latestPost} align="left" />}
      </div>
      </div>
    </EditorialSection>
  );
}
