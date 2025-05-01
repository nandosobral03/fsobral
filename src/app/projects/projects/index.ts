import { eos } from "./eos";
import { minos } from "./minos";
import { polemos } from "./poelmos";
import { rhea } from "./rhea";
import { chimera } from "./chimera";
import { spring83 } from "./spring83";
import { nochan } from "./nochan";
import { deadair } from "./deadair";
import { momentum } from "./momentum";
import { todayin } from "./todayin";
import { polemosRoyale } from "./polemos-royale";
import { reactBonsai } from "./react-bonsai";
import { mushare } from "./mushare";
import { fourCombinator } from "./4combinator";
import { timeslot } from "./timeslot";
import { superhumanBenchmark } from "./superhuman-benchmark";
import { mimicrai } from "./mimicrai";

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
  | "mimicrai";

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

export const projects: Project[] = [eos, rhea, polemos, minos, chimera, spring83, nochan, deadair, momentum, todayin, polemosRoyale, reactBonsai, mushare, fourCombinator, timeslot, superhumanBenchmark, mimicrai].reverse();
