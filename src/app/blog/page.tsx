"use client";

import { useState } from "react";
import LargeTitle from "@/components/common/large-title";
import { BlogPost } from "./components/blog-post";
import { posts } from "./posts";
import BlogInfo from "./blog-info";
import MarginaliaList from "./components/marginalia";
import { motion, AnimatePresence } from "motion/react";

type Tab = "posts" | "marginalia";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("posts");

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mb-20">
        <LargeTitle alt="IPSUM" animation="donut">
          BLOG
        </LargeTitle>
      </motion.div>

      <BlogInfo activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="h-16" />

      <div className="max-w-6xl mx-auto px-6 mb-20">
        <AnimatePresence mode="wait">
          {activeTab === "posts" ? (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              {posts
                .filter((post) => !post.hidden)
                .map((post, index) => (
                  <div key={post.slug}>
                    <BlogPost post={post} align={index % 2 === 0 ? "left" : "right"} />
                  </div>
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="marginalia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MarginaliaList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
