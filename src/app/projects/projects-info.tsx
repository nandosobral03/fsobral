"use client";

import SectionDescription from "@/components/common/section-description";
import Link from "next/link";

export default function ProjectsInfo() {
  return (
    <div className="w-full flex flex-col items-center px-6 py-12 bg-foreground text-background">
      <div className="w-full flex flex-col gap-6 max-w-7xl">
        <SectionDescription>
          Here is the list of projects I have worked on. The code to all of them can be found on my{" "}
          <Link href="https://github.com/nandosobral03" className="text-accent hover:underline font-semibold transition-all">
            Github
          </Link>
          , some of them have a live version that you can check out, sadly that's not the case for all of them, mostly because I don't want to keep going back to them and troubleshoot the issues that may have come up from months/years old
          code.
          <br />
          <br />
          Each of them has a small writeup about what I did, why and how and what I learned from them.
        </SectionDescription>
      </div>
    </div>
  );
}
