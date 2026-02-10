import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function AboutMe() {
  return (
    <section className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-6 relative">
      <SectionTitle index="01">About Me</SectionTitle>
      <SectionDescription>
        Hi! I&apos;m a Software Engineer and Full Stack Developer from Uruguay,
        currently working as a Senior Software Engineer at Double (YC S21).
        I&apos;m passionate about writing code, learning new technologies, and
        building things. When I&apos;m not shipping features, I like to explore
        side projects that scratch a creative itch, love building for the sake
        of building stuff
      </SectionDescription>
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-3">
          <span className="meta-label opacity-50 w-20 shrink-0">Role</span>
          <span className="text-sm font-serif">
            Senior Software Engineer at
            <a
              href="https://www.doublehq.com"
              className="text-[#5F63F5] mx-1 font-sans"
            >
              double
            </a>
            (YC S21)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="meta-label opacity-50 w-20 shrink-0">Location</span>
          <span className="text-sm font-serif">Montevideo, Uruguay</span>
        </div>
      </div>
    </section>
  );
}
