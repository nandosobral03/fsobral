"use client";
import { Fragment, useState } from "react";

import Betterreads from "./betterreads";
import Bookthing from "./bookthing";
import Consequences from "./consequences";
import Daedalus from "./daedalus";
import TimeWallpaperChanger from "./time-wallpaper-changer";
import VoidShout from "./voidshout";
import dayjs from "dayjs";
import Footnote from "@/app/blog/components/footnote";
import HoverableLink from "@/app/blog/components/hoverable-link";
import { Section, Paragraph, SectionTitle } from "@/app/blog/components/blog-section";
import SortDirection from "@/app/blog/components/sort-direction";
import Divider from "@/components/common/divider";

const projects: {
  title: string;
  date: dayjs.Dayjs;
  component: JSX.Element;
}[] = [
  {
    title: "Betterreads",
    date: dayjs("April 14, 2024"),
    component: <Betterreads />,
  },
  {
    title: "Bookthing",
    date: dayjs("December 11, 2023"),
    component: <Bookthing />,
  },
  {
    title: "Consequences",
    date: dayjs("February 20, 2024"),
    component: <Consequences />,
  },
  {
    title: "Void Shout",
    date: dayjs("July 07, 2023"),
    component: <VoidShout />,
  },
  {
    title: "Time Wallpaper Changer",
    date: dayjs("February 17, 2023"),
    component: <TimeWallpaperChanger />,
  },
  {
    title: "Daedalus",
    date: dayjs("May 20, 2023"),
    component: <Daedalus />,
  },
];

export default function GraveyardOfDeadProjects() {
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  return (
    <>
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          This is a list of some of the projects I've abandoned and their{" "}
          <Footnote footnote="Causa Mortis">
            <HoverableLink href="https://www.latin-is-simple.com/en/vocabulary/phrase/275/?h=causa+mortis">Cause of Death</HoverableLink>
          </Footnote>
        </Paragraph>
        <Paragraph>If you want to work on any of these ideas for yourself, feel free to do so.</Paragraph>
        <Paragraph>
          There is no shame in abandoning projects; it is something everyone does, and each abandoned project is a step towards finding the ones that truly matter. This article will never be complete, as I will continue to add to it as I
          work on and abandon projects.
        </Paragraph>
      </Section>
      <Section>
        <div className="ml-auto flex gap-4">
          <span className="grow">Sorted by date</span>
          <SortDirection onSort={setSortBy} value={sortBy} />
        </div>
      </Section>

      {projects
        .sort((a, b) => (sortBy === "asc" ? a.date.valueOf() - b.date.valueOf() : b.date.valueOf() - a.date.valueOf()))
        .map((project) => (
          <Fragment key={project.title}>
            <Divider className="my-4" />
            <Section>
              <SectionTitle>
                <span className="flex justify-between">
                  <span>{project.title}</span>
                  {project.date.format("MMMM D, YYYY")}
                </span>
              </SectionTitle>
              {project.component}
            </Section>
          </Fragment>
        ))}
    </>
  );
}
