import { BlogPost } from "@/app/blog/components/blog-post";
import { posts } from "@/app/blog/posts";
import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="p-6 flex flex-col gap-4">
      <SectionTitle>
        Blog
        <Link href="/blog" className="inline-flex">
          <span className="material-symbols-outlined text-3xl my-auto">north_east</span>
        </Link>
      </SectionTitle>
      <SectionDescription>Occasionally, I write short articles about things I've learned or topics I've enjoyed exploring.</SectionDescription>
      <BlogPost post={posts[0]} align="left" />
    </section>
  );
}
