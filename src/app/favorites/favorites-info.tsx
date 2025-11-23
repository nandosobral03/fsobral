"use client";

import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function FavoritesInfo() {
  return (
    <div className="w-full flex flex-col items-center px-6 py-12 bg-foreground text-background">
      <div className="w-full flex flex-col gap-6 max-w-5xl">
        <SectionTitle>Favorites</SectionTitle>
        <SectionDescription>
          Things I've read that stuck with me. Blogs, fiction, non-fiction, a bit of everything really, whatever resonated with me and changed how I see the world.
          <br />
          <br />
          Worth exploring more from these authors.
        </SectionDescription>
      </div>
    </div>
  );
}
