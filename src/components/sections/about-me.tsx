import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function AboutMe() {
  return (
    <section id="about" className="[grid-column:1/-1] md:[grid-column:1/6] flex flex-col gap-[var(--lh)] relative scroll-mt-24">
      <SectionTitle index="01">About Me</SectionTitle>
      <SectionDescription>
        I like taking small, unusual ideas seriously—giving them the same care
        in interaction, architecture, and finish as a larger product. Side
        projects are where I experiment, learn unfamiliar tools, and follow an
        idea all the way to something real.
      </SectionDescription>
    </section>
  );
}
