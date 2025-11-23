"use client";

import { BlogPost } from "@/app/blog/components/blog-post";
import { posts } from "@/app/blog/posts";
import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import Link from "next/link";
import { motion } from "motion/react";

export default function Blog() {
  return (
    <section className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <SectionTitle>Blog</SectionTitle>
        <motion.div whileHover={{ scale: 1.1, rotate: 45 }} transition={{ type: "spring", stiffness: 400 }}>
          <Link href="/blog" className="inline-flex group">
            <span className="material-symbols-outlined text-4xl my-auto text-accent group-hover:text-foreground transition-colors duration-300">north_east</span>
          </Link>
        </motion.div>
      </div>
      <SectionDescription>Occasionally, I write short articles about things I've learned or topics I've enjoyed exploring.</SectionDescription>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <BlogPost post={posts.filter((post) => !post.hidden)[0]} align="left" />
      </motion.div>
    </section>
  );
}
