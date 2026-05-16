import Link from "next/link";
import { projectCardEntry } from "@/content/surfaces/cards";
import type {
  ProjectEntry,
  ProjectYearContentSource,
  ProjectYearContentSurface,
} from "./project-types";

const projectYearSources = [
  {
    year: 2026,
    preface: (
      <>
        No clear goal yet in 2026, overall keep building. Build better, build
        nicer, explore new tech if it feets, make beautiful designs, have fun.
      </>
    ),
  },
  {
    year: 2025,
    side: "right",
    preface: (
      <>
        <span className="italic text-foreground/60">
          "I'm really in pursuit of greatness."
        </span>
        <br />
        <br />
        In 2025, the focus shifts from depth to excellence. I want to tackle
        harder, more challenging projects that push me beyond my comfort zone
        &mdash; projects that demand I finish the complex last 20% instead of
        settling for "good enough."
        <br />
        <br />
        The goal: build fewer things, but take my time to refine them, learn
        deep not broad.
      </>
    ),
  },
  {
    year: 2024,
    preface: (
      <>
        In 2024, I shifted from exploration to mastery. Instead of learning a
        little about everything, I doubled down on a core stack: React, Next.js,
        and tRPC.
        <br />
        <br />
        The mentality stayed the same &mdash; build for the sake of building
        &mdash; but with a new constraint: spend more time on fewer projects,
        polish them properly, and learn the technology deeply rather than
        broadly.
      </>
    ),
  },
  {
    year: 2023,
    side: "right",
    preface: (
      <>
        In 2023, I went wide. I learned as many technologies and frameworks as I
        could, building a broad understanding of the web development ecosystem.
        The goal was simple: just build stuff. Lots of small projects, mostly
        for myself and friends.
        <br />
        <br />
        About halfway through the year, I found{" "}
        <Link
          href="https://ntietz.com/blog/write-more-useless-software/"
          className="underline text-accent"
          target="_blank"
        >
          this blog post
        </Link>{" "}
        by Nick Tietz that resonated deeply. Who cares if you build something no
        one uses? Who cares if you write something no one reads? The point is to
        build for the joy of building, for the satisfaction that comes with
        creating something from nothing.
      </>
    ),
  },
] satisfies readonly ProjectYearContentSource[];

function assertUniqueConfiguredYears(sources: readonly ProjectYearContentSource[]) {
  const seen = new Set<number>();

  for (const source of sources) {
    if (seen.has(source.year)) {
      throw new Error(`project years contain duplicate year: ${source.year}`);
    }

    seen.add(source.year);
  }
}

export function createProjectYearContentSurfaces(
  entries: readonly ProjectEntry[]
): readonly ProjectYearContentSurface[] {
  assertUniqueConfiguredYears(projectYearSources);

  const entriesByYear = new Map<number, ProjectEntry[]>();

  for (const entry of entries) {
    const yearEntries = entriesByYear.get(entry.year) ?? [];
    yearEntries.push(entry);
    entriesByYear.set(entry.year, yearEntries);
  }

  const configuredYears = new Set(projectYearSources.map((source) => source.year));
  for (const year of entriesByYear.keys()) {
    if (!configuredYears.has(year)) {
      throw new Error(`projects/${year} has visible projects but no project year surface`);
    }
  }

  return Object.freeze(
    projectYearSources.map((source) => {
      const yearEntries = Object.freeze([...(entriesByYear.get(source.year) ?? [])]);

      if (yearEntries.length === 0) {
        throw new Error(`project year surface ${source.year} has no visible projects`);
      }

      return Object.freeze({
        ...source,
        side: source.side ?? "left",
        entries: yearEntries,
        cardEntries: Object.freeze(yearEntries.map(projectCardEntry)),
      });
    })
  );
}
