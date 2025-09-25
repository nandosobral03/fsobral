import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function AboutMe() {
  return (
    <section className="w-1/2 p-6 flex flex-col gap-4">
      <SectionTitle>About Me</SectionTitle>
      <SectionDescription>
        Hi! I'm a Software Engineer and Full Stack Developer from Uruguay, currently working as a Senior Software Engineer at Keeper.app (YC S21). I'm passionate about writing code, learning new technologies, and building things.
      </SectionDescription>
    </section>
  );
}
