"use client";

import Link from "next/link";
import { marginaliaPosts, MarginaliaPost } from "@/app/marginalia/posts";
import Tag from "@/components/common/tag";
import { motion } from "motion/react";
import { useState } from "react";

function MarginaliaCard({ post }: { post: MarginaliaPost }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/marginalia/${post.slug}`} className="block border-[3px] border-foreground hover:border-accent group overflow-hidden relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div className="absolute inset-0 bg-accent opacity-0 pointer-events-none" animate={{ opacity: isHovered ? 0.05 : 0 }} transition={{ duration: 0.3 }} />
      <div className="p-6 group-hover:bg-foreground group-hover:text-background transition-all duration-300 relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-accent mb-2">Marginalia</p>
        <h3 className="text-2xl font-bold uppercase font-condensed mb-2">{post.title}</h3>
        <p className="text-foreground/70 group-hover:text-background/70 mb-3">{post.description}</p>
        <p className="text-sm font-condensed text-accent">{post.date}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((t) => (
              <Tag key={t} interactive>
                {t}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function MarginaliaList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {marginaliaPosts.map((post) => (
        <MarginaliaCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
