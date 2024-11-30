import { Paragraph, Section, SectionSubtitle, Sidenote } from "@/app/blog/components/blog-section";

export default function Betterreads() {
  return (
    <Section>
      <SectionSubtitle>The Idea</SectionSubtitle>
      <Paragraph>The idea was to create a revamped UI version of Goodreads, keeping the functionality of rating books, writing reviews, sorting them into lists, and having a feed of what other users rate or add to their lists.</Paragraph>

      <SectionSubtitle>Causa Mortis</SectionSubtitle>
      <Paragraph>
        The project was initially planned with a couple of <Sidenote anchorText="friends">at least a good lesson on why working on team projects is never easy</Sidenote> to add a bigger project to all of our portfolios, but motivation faded
        from all parties. This led to the project being slowly dropped over the course of a few weeks.
      </Paragraph>
      <SectionSubtitle>Will I Ever Come Back to the Project?</SectionSubtitle>
      <Paragraph>
        I'd say there's no chance. I like the idea, but if I were to do an app of this style, I'd rather it be about something other than books. I don't enjoy simply recreating existing apps. Additionally, both of my friends who wanted to
        work on this no longer wish to continue, and I have no particular need to add a project like this to my portfolio.
      </Paragraph>
    </Section>
  );
}
