import { Paragraph, Section, SectionSubtitle } from "@/app/blog/components/blog-section";

import HoverableLink from "@/app/blog/components/hoverable-link";

export default function VoidShout() {
  return (
    <Section>
      <SectionSubtitle>The Idea</SectionSubtitle>
      <Paragraph>
        I wanted to create a page where users could post messages to the void, visible only to others who had the app open at the same time. I envisioned it as something similar to{" "}
        <HoverableLink href="https://theunsentproject.com/">The Unsent Project</HoverableLink>.
      </Paragraph>

      <SectionSubtitle>Causa Mortis</SectionSubtitle>
      <Paragraph>I prototyped it in about a day but felt it wasn’t enough, so I decided to scrap it.</Paragraph>

      <SectionSubtitle>Will I Ever Come Back to the Project?</SectionSubtitle>
      <Paragraph>
        I'd like to revisit it and keep it as a novelty. When I get around to learning Elixir more in-depth, I’d like to pursue it. For now, I plan to start by learning Elixir before diving into Phoenix Live View and AI assistance.
      </Paragraph>
    </Section>
  );
}
