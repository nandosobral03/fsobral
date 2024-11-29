import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function Projects() {
  return (
    <section className="w-1/2 p-6 flex flex-col gap-4">
      <SectionTitle>Projects</SectionTitle>
      <SectionDescription>
        I enjoy working on various projects, either because I want to build something I want to use, I want learn something by building with it or simply because an idea popped into my head and I had to make it a reality. I like to write a
        small post-natus writeup about what I did, why and how
      </SectionDescription>
    </section>
  );
}
