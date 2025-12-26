"use client";

import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import { motion, AnimatePresence } from "motion/react";

type Tab = "posts" | "marginalia";

interface BlogInfoProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BlogInfo({ activeTab, onTabChange }: BlogInfoProps) {
  const isMarginalia = activeTab === "marginalia";

  return (
    <div className="w-full flex bg-foreground text-background">
      {/* Content area */}
      <div className="flex-1 flex flex-col items-center px-6 py-12 overflow-hidden">
        <div className="w-full flex flex-col gap-6 max-w-5xl min-h-[220px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: "easeOut" }} className="flex flex-col gap-6">
              <SectionTitle>{isMarginalia ? "Marginalia" : "Blog"}</SectionTitle>
              <SectionDescription>
                {isMarginalia ? (
                  <>
                    Shorter (sometimes) posts about less researched topics. Or things I didn't want to have as a main blog entry.
                    <br />
                    <br />
                    Less polished than full posts, this way I still write the thoughts down but I don't have to worry about polishing them.
                  </>
                ) : (
                  <>
                    Sometimes I write short blogs about things I've learned or topics I've enjoyed exploring
                    <br />
                    <br />
                    Writing helps me think through ideas more clearly and serves as a personal reference for future me. Plus it's fun to deep dive into random topics, writing about them gives me a clear goal to work towards.
                  </>
                )}
              </SectionDescription>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Vertical toggle button - right side */}
      <button
        onClick={() => onTabChange(isMarginalia ? "posts" : "marginalia")}
        className={`w-12 md:w-16 flex-shrink-0 flex items-center justify-center border-l-[3px] transition-all duration-300 cursor-pointer group ${
          isMarginalia ? "bg-accent border-accent hover:bg-accent/80" : "bg-foreground/80 border-background/20 hover:bg-background hover:border-background"
        }`}
      >
        <span
          className={`font-condensed font-bold text-sm md:text-base uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
            isMarginalia ? "text-foreground group-hover:text-foreground/80" : "text-background/70 group-hover:text-foreground group-hover:scale-105"
          }`}
          style={{ writingMode: "vertical-rl" }}
        >
          Marginalia
        </span>
      </button>
    </div>
  );
}
