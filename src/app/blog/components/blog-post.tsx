"use client";

import ViewTransitionLink from "@/components/common/view-transition-link";
import type { ArticleCardEntry } from "@/content/surfaces/cards";
import Image from "next/image";

export const BlogPost = ({ post, align }: { post: ArticleCardEntry; align: "left" | "right" }) => {
  return (
    <ViewTransitionLink
      href={post.href}
      routeLayer
      scroll={false}
      key={post.href}
      className={`flex bg-foreground text-background group flex-col-reverse border border-foreground/10 ${align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"} overflow-hidden`}
    >
      <div className={`p-[var(--lh)] grow text-left ${align === "left" ? "lg:text-left" : "lg:text-right"} flex flex-col gap-[var(--bl)]`}>
        <p className="meta-label text-accent/70">{post.date}</p>
        <h3 className="display-title text-xl md:text-2xl text-background">{post.title}</h3>
        <p className="editorial-copy text-sm md:text-base text-background/55">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <div className={`mt-auto flex flex-wrap gap-2 pt-2 justify-start ${align === "left" ? "lg:justify-start" : "lg:justify-end"}`}>
            {post.tags.map((t) => (
              <span key={t} className="meta-label text-[10px] on-ink-meta border border-accent/60 px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      {post.coverImage && (
        <div className="lg:w-[34%] lg:min-w-[300px] lg:max-w-[360px] lg:shrink-0 w-full h-48 lg:h-auto relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1600}
            height={900}
            sizes="(max-width: 1023px) 100vw, 360px"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
    </ViewTransitionLink>
  );
};
