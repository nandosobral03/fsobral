"use client";

import { BlogPost } from "@/app/blog/components/blog-post";
import { posts } from "@/app/blog/posts";
import SectionTitle from "@/components/common/section-title";
import Link from "next/link";
import { motion } from "motion/react";

export default function Blog() {
  return (
    <section className="px-6 flex flex-col gap-3">
      <SectionTitle index="03">Blog</SectionTitle>
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-serif text-foreground/50">
          Writing about a bit of everything
        </p>
        <Link
          href="/blog"
          className="meta-label text-foreground/40 hover:text-foreground transition-colors duration-300"
        >
          View all
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <BlogPost post={posts.filter((post) => !post.hidden)[0]} align="left" />
      </motion.div>
    </section>
  );
}
