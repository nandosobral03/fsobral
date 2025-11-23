"use client";

import LargeTitle from "@/components/common/large-title";
import { BlogPost } from "./components/blog-post";
import { posts } from "./posts";
import BlogInfo from "./blog-info";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mb-20">
        <LargeTitle alt="IPSUM">BLOG</LargeTitle>
      </motion.div>

      <BlogInfo />

      <div className="h-16" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8 mb-20">
        {posts
          .filter((post) => !post.hidden)
          .map((post, index) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <BlogPost post={post} align={index % 2 === 0 ? "left" : "right"} />
            </motion.div>
          ))}
      </div>
    </>
  );
}
