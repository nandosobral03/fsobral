import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function TechStack() {
  return (
    <section className="w-1/2 p-6 flex flex-col gap-4">
      <SectionTitle>Tech Stack</SectionTitle>
      <SectionDescription>My current stack focuses mostly on React, TypeScript, Next.js, and tRPC, but I also enjoy exploring Rust, Python, Svelte and whatever else piques my interest.</SectionDescription>
    </section>
  );
}
