import { Codeblock, Paragraph, Section, SectionSubtitle, Sidenote } from "@/app/blog/components/blog-section";

import HoverableLink from "@/app/blog/components/hoverable-link";

export default function Bookthing() {
  return (
    <Section>
      <SectionSubtitle>The Idea</SectionSubtitle>
      <Paragraph>
        A companion app for books similar to what <HoverableLink href="https://genius.com/">Genius</HoverableLink> is for lyrics. It wouldn't be line by line but rather feature user-created summaries and charts for given books or chapters
        to help others remember what happened or serve as a companion while reading. I liked the idea of using something like TL Draw that would allow users to easily create charts for the current situation in a given part of a book.
      </Paragraph>

      <SectionSubtitle>Causa Mortis</SectionSubtitle>
      <Paragraph>
        TL Draw's versioning isn’t very developer-friendly as it isn’t based on
        <Sidenote anchorText=" SemVer ">
          <HoverableLink href="https://tldraw.dev/releases-versioning">For whatever reason</HoverableLink>
        </Sidenote>
        I got the basics of the app working on one PC, but when I cloned the repo on another, breaking changes appeared after running
        <Codeblock>npm i</Codeblock>
        Maybe I got unlucky with the releases and the timing of the project, but working around the constant changes and lack of support since the latest release was so new made me unmotivated to keep working on it.
      </Paragraph>

      <Paragraph>
        I understand the need to adapt processes and tools to project needs, but considering that the npm ecosystem is based on
        <Sidenote anchorText=" SemVer ">
          I mean Semver is part of the <HoverableLink href="https://docs.npmjs.com/about-semantic-versioning">npm docs</HoverableLink>
        </Sidenote>
        I don’t think changing something like this makes much sense.
      </Paragraph>

      <SectionSubtitle>Will I Ever Come Back to the Project?</SectionSubtitle>
      <Paragraph>I still like the idea. I might come back to this if I find myself in an idea drought and if the TL Draw API stabilizes a bit so it's more manageable.</Paragraph>
    </Section>
  );
}
