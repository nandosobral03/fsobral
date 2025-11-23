"use client";

import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function BlogInfo() {
  return (
    <div className="w-full flex flex-col items-center px-6 py-12 bg-foreground text-background">
      <div className="w-full flex flex-col gap-6 max-w-5xl">
        <SectionTitle>Blog</SectionTitle>
        <SectionDescription>
          Sometimes I write short blogs about things I've learned or topics I've enjoyed exploring
          <br />
          <br />
          Writing helps me think through ideas more clearly and serves as a personal reference for future me. Plus it's fun to deep dive into random topics, writing about them gives me a clear goal to work towards.
        </SectionDescription>
      </div>
    </div>
  );
}
