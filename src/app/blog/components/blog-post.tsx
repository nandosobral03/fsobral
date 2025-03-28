import Link from "next/link";
import type { Post } from "../posts";
import Image from "next/image";
import { SectionTitle } from "./blog-section";

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
