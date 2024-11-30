import { Paragraph, Section, SectionSubtitle } from "@/app/blog/components/blog-section";

export default function Consequences() {
  return (
    <Section>
      <SectionSubtitle>The Idea</SectionSubtitle>
      <Paragraph>A customizable game of Consequences playable across different computers, similar to Gartic Phone. At the end, an AI would generate images based on what was written.</Paragraph>

      <SectionSubtitle>Causa Mortis</SectionSubtitle>
      <Paragraph>
        I had already created all the logic, and it was working okay. It just needed some extra design and game configuration options. However, I realized that free AI image generation wasn't quite there yet. This meant that each game would
        have a considerable cost and wouldn't look amazing.
      </Paragraph>

      <SectionSubtitle>Will I Ever Come Back to the Project?</SectionSubtitle>
      <Paragraph>I might come back to it stripping out the part of AI image generation and create a polished version of Consequences online since I found that there isn't really an existing alternative as of now.</Paragraph>
    </Section>
  );
}
