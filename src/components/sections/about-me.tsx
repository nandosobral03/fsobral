import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function AboutMe() {
  return (
    <section className="w-1/2 p-6 flex flex-col gap-4">
      <SectionTitle>About Me</SectionTitle>
      <SectionDescription>
        Hi! I'm a 25-year-old Software Engineer and Full Stack Developer from Uruguay, currently working as a Tech Lead at Eagerworks. I'm passionate about writing code, learning new technologies, and building things.
      </SectionDescription>
    </section>
  );
}
