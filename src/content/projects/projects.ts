import { defineCollection } from "@/content/core/collection";
import { toProjectSlug } from "@/content/core/routes";
import { projectCardEntry } from "@/content/surfaces/cards";
import { projectJsonLd } from "@/content/surfaces/json-ld";
import { projectMetadata } from "@/content/surfaces/metadata";
import { projectOgImage } from "@/content/surfaces/og";
import { projectSitemapEntry } from "@/content/surfaces/sitemap-entry";
import { createProjectYearContentSurfaces } from "./project-years";
import { fourCombinator } from "./entries/4combinator";
import { apollo } from "./entries/apollo";
import { atmosphere } from "./entries/atmosphere";
import { chimera } from "./entries/chimera";
import { consequences } from "./entries/consequences";
import { deadair } from "./entries/deadair";
import { eos } from "./entries/eos";
import { gitCopycat } from "./entries/git-copycat";
import { mimicrai } from "./entries/mimicrai";
import { minos } from "./entries/minos";
import { momentum } from "./entries/momentum";
import { mushare } from "./entries/mushare";
import { nochan } from "./entries/nochan";
import { overload } from "./entries/overload";
import { polemos } from "./entries/poelmos";
import { polemosRoyale } from "./entries/polemos-royale";
import { rabbithole } from "./entries/rabbithole";
import { reactBonsai } from "./entries/react-bonsai";
import { rhea } from "./entries/rhea";
import { spring83 } from "./entries/spring83";
import { spring84 } from "./entries/spring84";
import { superhumanBenchmark } from "./entries/superhuman-benchmark";
import { timeslot } from "./entries/timeslot";
import { todayin } from "./entries/todayin";
import type { ProjectCollection, ProjectEntry, ProjectSource } from "./project-types";

const projectSources = [
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
].reverse() satisfies readonly ProjectSource[];

function validateProject(entry: ProjectEntry) {
  if (!entry.preview.cover.trim()) {
    throw new Error(`projects/${entry.slug} is missing a preview cover`);
  }
  if (!entry.preview.description.trim()) {
    throw new Error(`projects/${entry.slug} is missing a preview description`);
  }
  if (entry.sections.length === 0) {
    throw new Error(`projects/${entry.slug} has no sections`);
  }
}

const base = defineCollection<ProjectSource, ProjectEntry>({
  name: "projects",
  basePath: "/projects",
  sources: projectSources,
  getTitle: (source) => source.name,
  getSlug: (source) => source.slug ?? toProjectSlug(source.name),
  getDate: (source) => source.updatedAt,
  makeEntry: (source, fields) => ({
    ...source,
    slug: fields.slug,
    path: source.path ?? fields.path,
    lastModifiedIso: fields.dateIso!,
    lastModifiedTimestamp: fields.dateTimestamp!,
  }),
  matchRouteParam: (entry, decodedParam) => entry.name === decodedParam,
  validateEntry: validateProject,
});

const projectYearSurfaces = createProjectYearContentSurfaces(base.visible());

export const projects: ProjectCollection = {
  ...base,
  years: () => projectYearSurfaces,
  cardEntries: (entries = base.visible()) => entries.map(projectCardEntry),
  metadata: projectMetadata,
  jsonLd: projectJsonLd,
  ogImage: projectOgImage,
  sitemapEntries: () => base.visible().map(projectSitemapEntry),
};
