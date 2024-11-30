import { Paragraph, Section, SectionSubtitle, Sidenote } from "@/app/blog/components/blog-section";

export default function Daedalus() {
  return (
    <Section>
      <SectionSubtitle>The Idea</SectionSubtitle>
      <Paragraph>
        At the time, I was creating a lot of projects and manually uploading them to my Linode instance. I wanted to streamline this process by developing an app that would automate the necessary commands, manage environment variables, and
        essentially deploy projects for me.
      </Paragraph>

      <SectionSubtitle>Causa Mortis</SectionSubtitle>
      <Paragraph>
        I liked the idea, but as I worked on it, I realized that the effort required would exceed the benefits of automating the deploy process.{" "}
        <Sidenote anchorText="The amount of work involved">Just all the posibilities for deploying without docker each language I wanted to test out makes the scope of this pretty ridiculous </Sidenote> was not justified by the value it
        would provide.
      </Paragraph>

      <SectionSubtitle>Will I Ever Come Back to the Project?</SectionSubtitle>
      <Paragraph>No, considering that I no longer deploy to Linode and have moved to more streamlined options like Vercel, AWS, or Docker, I see no purpose in revisiting this project.</Paragraph>
    </Section>
  );
}
