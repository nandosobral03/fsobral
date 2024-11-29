import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function TechStack() {
  return (
    <section className="w-1/2 p-6 flex flex-col gap-4">
      <SectionTitle>Tech Stack</SectionTitle>
      <SectionDescription>My current stack includes TypeScript, React, Next.js, and tRPC, but I also enjoy exploring Rust, Svelte, and other technologies that pique my interest.</SectionDescription>
    </section>
  );
}
