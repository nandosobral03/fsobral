import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function AboutMe() {
  return (
    <section className="[grid-column:1/-1] md:[grid-column:1/6] flex flex-col gap-[var(--lh)] relative">
      <SectionTitle index="01">About Me</SectionTitle>
      <SectionDescription>
        Hi! I&apos;m a Software Engineer and Full Stack Developer from Uruguay,
        currently working as a Senior Software Engineer at Double (YC S21).
        I&apos;m passionate about writing code, learning new technologies, and
        building things. When I&apos;m not shipping features, I like to explore
        side projects that scratch a creative itch, love building for the sake
        of building stuff
      </SectionDescription>
    </section>
  );
}
