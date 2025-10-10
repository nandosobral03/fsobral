import Link from "next/link";
import type { Post } from "../posts";
import Image from "next/image";
import { SectionTitle } from "./blog-section";
import Tag from "@/components/common/tag";
import { calculateReadingTime } from "../utils/reading-time";

export const BlogPost = ({ post, align }: { post: Post; align: "left" | "right" }) => {
  const readingTimeMinutes = calculateReadingTime(post.components);
  return (
    <Link href={`/blog/${post.slug}`} key={post.slug} className={`mb-6 flex lg:h-[300px] grow border-[3px] border-foreground group flex-col-reverse ${align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
      <div className={`p-4 group-hover:bg-foreground group-hover:text-background transition-colors grow ${align === "left" ? "text-left" : "text-right"} flex flex-col`}>
        <div>
          <SectionTitle>{post.title}</SectionTitle>
          <p className="text-lg mb-2">{post.description}</p>
          <p className="text-sm font-condensed">
            {post.date}
            {readingTimeMinutes ? <> · ~{readingTimeMinutes} min read</> : null}
          </p>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className={`mt-auto flex flex-wrap gap-2 ${align === "left" ? "justify-start" : "justify-end"}`}>
            {post.tags.map((t) => (
              <Tag key={t} interactive>
                {t}
              </Tag>
            ))}
          </div>
        )}
      </div>
      {post.coverImage && <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="lg:w-auto lg:h-full w-full h-auto" />}
    </Link>
  );
};
