import { Paragraph, Section, SectionSubtitle } from "@/app/blog/components/blog-section";

export default function TimeWallpaperChanger() {
  return (
    <Section>
      <SectionSubtitle>The Idea</SectionSubtitle>
      <Paragraph>
        A web app that allows users to visualize their goals as a graph with a linear ordering of tasks, them being able to see what they currently can do, and what the steps are to get to the next step. The idea also included them settings
        the end goal and using an LLM or similar to generate the steps to get to the end goal.
      </Paragraph>

      <SectionSubtitle>Causa Mortis</SectionSubtitle>
      <Paragraph>
        I actually completed this project, I just will never release it. I think the idea is okay, but at the end of the day it's a glorified todo list, which I feels is not good enough to release so I'm just going to let it rot.
      </Paragraph>

      <SectionSubtitle>Will I Ever Come Back to the Project?</SectionSubtitle>
      <Paragraph>Unless I can figure out how to make it more interesting then I'm not going to.</Paragraph>
    </Section>
  );
}
