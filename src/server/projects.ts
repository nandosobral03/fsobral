import { eos } from "./projects/eos";
import { minos } from "./projects/minos";
import { polemos } from "./projects/poelmos";
import { rhea } from "./projects/rhea";
import { chimera } from "./projects/chimera";
import { spring83 } from "./projects/spring83";
import { nochan } from "./projects/nochan";
import { deadair } from "./projects/deadair";
import { momentum } from "./projects/momentum";
import { todayin } from "./projects/todayin";
import { polemosRoyale } from "./projects/polemos-royale";
import { reactBonsai } from "./projects/react-bonsai";
import { mushare } from "./projects/mushare";
import { fourCombinator } from "./projects/4combinator";
type ProjectNames = "eos" | "rhea" | "polemos" | "minos" | "chimera" | "spring'83" | "nochan" | "deadair" | "momentum" | "today in" | "polemos royale" | "react bonsai" | "mushare" | "4combinator";

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

export const projects: Project[] = [eos, rhea, polemos, minos, chimera, spring83, nochan, deadair, momentum, todayin, polemosRoyale, reactBonsai, mushare, fourCombinator].reverse();
