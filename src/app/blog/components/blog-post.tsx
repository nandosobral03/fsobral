"use client";

import Link from "next/link";
import type { Post } from "../posts";
import Image from "next/image";
import { SectionTitle } from "./blog-section";
import Tag from "@/components/common/tag";
import { motion } from "motion/react";
import { useState } from "react";

export const BlogPost = ({ post, align }: { post: Post; align: "left" | "right" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      key={post.slug}
      className={`mb-6 flex lg:h-[300px] grow border-[3px] border-foreground hover:border-accent group flex-col-reverse ${align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"} overflow-hidden relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="absolute inset-0 bg-accent opacity-0 pointer-events-none" animate={{ opacity: isHovered ? 0.05 : 0 }} transition={{ duration: 0.3 }} />
      <div className={`p-6 group-hover:bg-foreground group-hover:text-background transition-all duration-300 grow text-left ${align === "left" ? "lg:text-left" : "lg:text-right"} flex flex-col relative z-10`}>
        <div>
          <SectionTitle>{post.title}</SectionTitle>
          <p className="text-lg mb-2 leading-relaxed">{post.description}</p>
          <p className="text-sm font-condensed text-foreground group-hover:text-accent">{post.date}</p>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className={`mt-auto flex flex-wrap gap-2 justify-start ${align === "left" ? "lg:justify-start" : "lg:justify-end"}`}>
            {post.tags.map((t) => (
              <Tag key={t} interactive>
                {t}
              </Tag>
            ))}
          </div>
        )}
      </div>
      {post.coverImage && (
        <motion.div className="lg:w-auto lg:h-full w-full h-auto relative overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
          <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="lg:w-auto lg:h-full w-full h-auto object-cover" />
        </motion.div>
      )}
    </Link>
  );
};
