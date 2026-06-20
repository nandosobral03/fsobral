"use client";

import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import { motion, AnimatePresence } from "motion/react";
import { EditorialGrid, EditorialSection, MetaLabel } from "@/components/common/editorial";

type Tab = "posts" | "marginalia";

interface BlogInfoProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BlogInfo({ activeTab, onTabChange }: BlogInfoProps) {
  const isMarginalia = activeTab === "marginalia";

  return (
    <EditorialSection tone="ink">
      <EditorialGrid className="py-[calc(var(--lh)*2)]">
        <div className="[grid-column:1/5] hidden md:block">
          <MetaLabel className="text-background/30">Index</MetaLabel>
        </div>
        <div className="[grid-column:1/-1] md:[grid-column:5/12] min-h-[220px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: "easeOut" }} className="flex flex-col gap-6">
              <SectionTitle>{isMarginalia ? "Marginalia" : "Blog"}</SectionTitle>
              <SectionDescription className="text-background/85">
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

      <button
        type="button"
        aria-pressed={isMarginalia}
        onClick={() => onTabChange(isMarginalia ? "posts" : "marginalia")}
        className={`[grid-column:1/-1] md:[grid-column:12/13] min-h-[72px] md:min-h-[220px] flex items-center justify-center border-t-2 md:border-l-2 md:border-t-0 transition-all duration-300 cursor-pointer group ${
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
      </EditorialGrid>
    </EditorialSection>
  );
}
