"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BlogPost } from "./components/blog-post";
import BlogInfo from "./blog-info";
import MarginaliaList from "./components/marginalia";
import { ContentRail, EditorialSection, StructuralRule } from "@/components/common/editorial";
import type { ArticleCardEntry } from "@/content/surfaces/cards";

type Tab = "posts" | "marginalia";

export default function BlogIndexClient({
  posts,
  marginaliaPosts,
}: {
  posts: readonly ArticleCardEntry[];
  marginaliaPosts: readonly ArticleCardEntry[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("posts");

  return (
    <>
      <BlogInfo activeTab={activeTab} onTabChange={setActiveTab} />

      <StructuralRule />

      <EditorialSection className="py-[calc(var(--lh)*2)] mb-[calc(var(--lh)*3)]">
        <ContentRail width="wide">
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
                {posts.map((post, index, arr) => (
                  <div key={post.href}>
                    <BlogPost
                      post={post}
                      align={index % 2 === 0 ? "left" : "right"}
                    />
                    {index < arr.length - 1 && (
                      <StructuralRule className="my-[calc(var(--lh)*1.5)]" />
                    )}
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
                <MarginaliaList posts={marginaliaPosts} />
              </motion.div>
            )}
          </AnimatePresence>
        </ContentRail>
      </EditorialSection>
    </>
  );
}
