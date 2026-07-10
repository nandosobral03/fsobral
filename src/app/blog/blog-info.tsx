"use client";

import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";
import { motion, AnimatePresence } from "motion/react";
import { EditorialGrid, EditorialSection, MetaLabel } from "@/components/common/editorial";
import { WritingIndexGraphic } from "@/components/common/editorial-data-graphics";

type Tab = "posts" | "marginalia";

interface BlogInfoProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  essayCount: number;
  marginaliaCount: number;
}

export default function BlogInfo({ activeTab, onTabChange, essayCount, marginaliaCount }: BlogInfoProps) {
  const isMarginalia = activeTab === "marginalia";

  return (
    <EditorialSection tone="ink">
      <EditorialGrid className="py-[calc(var(--lh)*1.5)]">
        <div className="[grid-column:1/-1] flex flex-col gap-[var(--bl)] md:[grid-column:1/4]">
          <MetaLabel className="on-ink-meta">Index</MetaLabel>
          <div role="tablist" aria-label="Writing index" className="flex gap-2 md:flex-col">
            {(["posts", "marginalia"] as const).map((tab) => {
              const selected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="writing-index-panel"
                  onClick={() => onTabChange(tab)}
                  className={`meta-label border px-3 py-2 text-left transition-colors ${
                    selected
                      ? "border-accent bg-accent text-foreground"
                      : "border-background/30 on-ink-muted hover:border-background"
                  }`}
                >
                  {tab === "posts" ? "Essays" : "Marginalia"}
                </button>
              );
            })}
          </div>
          <WritingIndexGraphic
            essays={essayCount}
            marginalia={marginaliaCount}
            activeTab={activeTab}
            className="mt-auto pt-[var(--bl)]"
          />
        </div>
        <div
          id="writing-index-panel"
          role="tabpanel"
          className="[grid-column:1/-1] min-h-[168px] overflow-hidden md:[grid-column:5/13]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: "easeOut" }} className="flex flex-col gap-6">
              <SectionTitle>{isMarginalia ? "Marginalia" : "Blog"}</SectionTitle>
              <SectionDescription className="text-background/85">
                {isMarginalia ? (
                  <>Shorter field notes: observations, experiments, changelogs, and ideas worth keeping before they become essays.</>
                ) : (
                  <>Long-form notes on software, product craft, and the ideas that emerge while building. Writing is how I pressure-test what I learned and leave a useful trail for the next project.</>
                )}
              </SectionDescription>
            </motion.div>
          </AnimatePresence>
        </div>
      </EditorialGrid>
    </EditorialSection>
  );
}
