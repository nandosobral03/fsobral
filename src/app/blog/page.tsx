import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import { posts, type Post } from "./posts";
import Link from "next/link";
import SectionTitle from "@/components/common/section-title";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <LargeTitle alt="IPSUM">BLOG</LargeTitle>
      <Divider className="my-4" />
      <div className="mx-4 flex flex-col gap-4">
        {posts.map((post, index) => (
          <BlogPost post={post} align={index % 2 === 0 ? "left" : "right"} key={post.slug} />
        ))}
      </div>
      <Divider />
    </>
  );
}

export const BlogPost = ({ post, align }: { post: Post; align: "left" | "right" }) => {
  return (
    <Link href={`/blog/${post.slug}`} key={post.slug} className={`mb-6 flex lg:h-[300px] grow border-[3px] border-foreground group flex-col-reverse ${align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
      <div className={`p-4 group-hover:bg-foreground group-hover:text-background transition-colors grow ${align === "left" ? "text-left" : "text-right"}`}>
        <SectionTitle>{post.title}</SectionTitle>
        <p className="text-lg mb-2">{post.description}</p>
        <p className="text-sm font-condensed">{post.date}</p>
      </div>
      {post.coverImage && <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="lg:w-auto lg:h-full w-full h-auto" />}
    </Link>
  );
};
