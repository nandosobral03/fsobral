"use client";

import SectionDescription from "@/components/common/section-description";
import Link from "next/link";
import { ContentRail, EditorialSection } from "@/components/common/editorial";

export default function ProjectsInfo() {
  return (
    <EditorialSection tone="ink">
      <ContentRail width="wide" className="py-[calc(var(--lh)*2)]">
        <SectionDescription className="text-background/85">
          Here is the list of projects I have worked on. The code for most of
          them can be found on my{" "}
          <Link
            href="https://github.com/nandosobral03"
            className="text-accent hover:underline font-semibold transition-all"
          >
            github
          </Link>
          , some of them have a live version that you can check out, sadly
          that's not the case for all of them, mostly because I don't want to
          keep going back to them and troubleshoot the issues that may have come
          up from months/years old code.
          <br />
          <br />
          Each of them has a small writeup about what I did, why and how and
          what I learned from them.
        </SectionDescription>
      </ContentRail>
    </EditorialSection>
  );
}
