import { fourCombinator } from "./4combinator";
import { apollo } from "./apollo";
import { atmosphere } from "./atmosphere";
import { chimera } from "./chimera";
import { deadair } from "./deadair";
import { eos } from "./eos";
import { mimicrai } from "./mimicrai";
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
  | "atmosphere";

export type Project = {
  name: ProjectNames;
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

export const projects: Project[] = [
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
].reverse();
