import Divider from "@/components/common/divider";
import LargeTitle from "@/components/common/large-title";
import ProjectsInfo from "./projects-info";
import ProjectsByYear from "./projects-by-year";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LargeTitle>PROJECTS</LargeTitle>
      <Divider />
      <ProjectsInfo />
      <Divider />
      <ProjectsByYear
        year={2024}
        preface={
          <>
            2024 I decided to focus on building less but more polished projects. My mentality was the same, build for the sake of building, but now I wanted to learn deeper rather than wider. I wanted to spend more time on the same couple
            of technologies and master them as much as I could. This means that if the proyect was web based I would use React, Next, tRPC for them.
          </>
        }
      />
      <Divider />
      <ProjectsByYear
        year={2023}
        preface={
          <>
            In 2023 I decided to pour my efforts into learning a lot of new technologies and frameworks without focusing on a specific subset of them. I wanted to get a broad understanding of the web development ecosystem and see what I
            liked and what I didn't. Learning how different frameworks and libraries work and how they solve problems allowed me to see the bigger picture and make more informed decisions in the future. The main objective was to 'just build
            stuff' and see what I could come up with. I built a lot of small projects most of them just for myself and my friends.
            <br />
            <br />
            About halfway through the year, I found{" "}
            <Link href="https://ntietz.com/blog/write-more-useless-software/" className="underline text-accent" target="_blank">
              this blog post
            </Link>{" "}
            by Nick Tietz that resonated with me. Who cares if you build something that no one uses? Who cares if you write something that no one reads? Probably even these words will only be read by me and a handful of people in the long
            run The point is to learn, or not even learn, just to build something for the joy of building something and the satisfaction that comes with it.
          </>
        }
      />
    </>
  );
}
