import SectionDescription from "@/components/common/section-description";
import SectionTitle from "@/components/common/section-title";

export default function AboutMe() {
  return (
    <section className="p-6 flex flex-col gap-4">
      <SectionTitle>Blog</SectionTitle>
      <SectionDescription>Occasionally, I write short articles about things I’ve learned or topics I’ve enjoyed exploring.</SectionDescription>
    </section>
  );
}
