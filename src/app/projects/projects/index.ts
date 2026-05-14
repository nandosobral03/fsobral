import { fourCombinator } from "./4combinator";
import { apollo } from "./apollo";
import { atmosphere } from "./atmosphere";
import { chimera } from "./chimera";
import { consequences } from "./consequences";
import { deadair } from "./deadair";
import { eos } from "./eos";
import { gitCopycat } from "./git-copycat";
import { mimicrai } from "./mimicrai";
import { overload } from "./overload";
import { minos } from "./minos";
import { momentum } from "./momentum";
import { mushare } from "./mushare";
import { nochan } from "./nochan";
import { polemos } from "./poelmos";
import { polemosRoyale } from "./polemos-royale";
import { rabbithole } from "./rabbithole";
import { reactBonsai } from "./react-bonsai";
import { rhea } from "./rhea";
import { spring83 } from "./spring83";
import { spring84 } from "./spring84";
import { superhumanBenchmark } from "./superhuman-benchmark";
import { timeslot } from "./timeslot";
import { todayin } from "./todayin";

import React from "react";

type ProjectNames =
  | "eos"
  | "rhea"
  | "polemos"
  | "minos"
  | "chimera"
  | "spring'83"
  | "spring'84"
  | "nochan"
  | "deadair"
  | "momentum"
  | "today in"
  | "polemos royale"
  | "react bonsai"
  | "mushare"
  | "4combinator"
  | "timeslot"
  | "superhuman benchmark"
  | "mimicrai"
  | "rabbithole"
  | "apollo"
  | "atmosphere"
  | "git copycat"
  | "consequences"
  | "overload";

export type Project = {
  name: ProjectNames;
  slug?: string;
  path?: string;
  links: { url: string; name: string }[];
  year: number;
  preview: {
    cover: string;
    description: string;
  };
  sections: {
    title: string;
    component: React.ReactNode | string;
  }[];
  images?: {
    url: string;
    alt: string;
    isMobile?: boolean;
  }[];
};

const baseProjects: Project[] = [
  eos,
  rhea,
  polemos,
  minos,
  chimera,
  spring83,
  nochan,
  deadair,
  momentum,
  todayin,
  polemosRoyale,
  reactBonsai,
  mushare,
  fourCombinator,
  timeslot,
  superhumanBenchmark,
  mimicrai,
  rabbithole,
  apollo,
  atmosphere,
  gitCopycat,
  consequences,
  overload,
  spring84,
].reverse();

export function toProjectSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function withProjectRouting(project: Project): Project {
  const slug = project.slug ?? toProjectSlug(project.name);
  return {
    ...project,
    slug,
    path: `/projects/${slug}`,
  };
}

export const projects: Project[] = baseProjects.map(withProjectRouting);

export function getProjectByRouteParam(param: string) {
  const decoded = decodeURIComponent(param);
  return projects.find((project) => project.slug === decoded || project.name === decoded);
}

export function getProjectPath(project: Pick<Project, "name" | "slug" | "path">) {
  return project.path ?? `/projects/${project.slug ?? toProjectSlug(project.name)}`;
}

export function getProjectCardView(project: Project) {
  return {
    title: project.name,
    year: project.year,
    image: project.preview.cover,
    description: project.preview.description,
    href: getProjectPath(project),
  };
}

export function getProjectsByYear(year: number) {
  return projects.filter((project) => project.year === year);
}
