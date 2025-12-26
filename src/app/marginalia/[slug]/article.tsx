"use client";

import type { MarginaliaPost } from "../posts";
import Tag from "@/components/common/tag";

export default function MarginaliaArticle({ post }: { post: MarginaliaPost }) {
  return (
    <>
      {/* Dark intro section */}
      <div className="w-full bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-accent">Marginalia</p>
          <h1 className="text-4xl md:text-6xl font-bold uppercase font-condensed tracking-wide leading-tight">{post.title}</h1>
          {post.description && <div className="text-lg md:text-xl font-light leading-relaxed opacity-90">{post.description}</div>}
          <div className="flex flex-wrap items-center gap-4 text-sm uppercase font-condensed">
            <span className="text-accent">{post.date}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-16" />

      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="flex flex-col gap-4">{post.components}</div>
      </div>
    </>
  );
}
