import SectionTitle from "@/components/common/section-title";
import Image from "next/image";
import SectionDescription from "../common/section-description";

export default function ContactMe() {
  return (
    <section className="flex flex-col gap-4 w-full" id="contact">
      <div className="p-6">
        <SectionTitle>Contact Me</SectionTitle>
        <SectionDescription>If you have any questions or just want to say hi, feel free to contact me it's always nice to hear from strangers on the internet.</SectionDescription>
      </div>
      <div className="w-full items-center justify-center flex flex-col md:flex-row mb-20">
        <a
          href="mailto:nandosobral03@gmail.com"
          className="group w-[300px] py-12 border-[3px] md:border-r-[1.5px] border-foreground hover:bg-foreground hover:text-background md:border-b-[3px] border-b-0 flex flex-col items-center justify-center text-sm gap-2"
        >
          <Image src="/icons/email.png" alt="Email" width={24} height={24} className="group-hover:invert" />
        </a>
        <a
          href="https://www.linkedin.com/in/fernando-sobral-2b100621b/"
          className="group w-[300px] py-12 border-[3px] border-foreground hover:bg-foreground hover:text-background md:border-y-[3px] flex flex-col items-center justify-center text-sm gap-2"
        >
          <Image src="/icons/linkedin.png" alt="LinkedIn" width={24} height={24} className="group-hover:invert" />
        </a>
        <a
          href="https://www.github.com/nandosobral03"
          className="group w-[300px] py-12 border-[3px] md:border-l-[1.5px] border-foreground hover:bg-foreground hover:text-background md:border-t-[3px] border-t-0 flex flex-col items-center justify-center text-sm gap-2"
        >
          <Image src="/icons/github.png" alt="GitHub" width={24} height={24} className="group-hover:invert" />
        </a>
      </div>
    </section>
  );
}
