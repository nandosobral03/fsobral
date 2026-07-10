"use client";

import SectionDescription from "@/components/common/section-description";
import Link from "next/link";
import { ContentRail, EditorialSection } from "@/components/common/editorial";

export default function ProjectsInfo() {
  return (
    <EditorialSection tone="ink" className="border-y border-background/10">
      <ContentRail width="wide" className="py-[calc(var(--lh)*2)]">
        <SectionDescription className="text-background/85">
          This archive traces how I learn: by shipping complete products,
          protocols, tools, and experiments. Open a project for the problem,
          the decisions behind it, and what I would change next.
          <br />
          <br />
          Public source is available on{" "}
          <Link
            href="https://github.com/nandosobral03"
            className="text-accent hover:underline font-semibold transition-all"
          >
            GitHub
          </Link>
          . Maintained demos are linked from their case studies.
        </SectionDescription>
      </ContentRail>
    </EditorialSection>
  );
}
