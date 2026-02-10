import SectionTitle from "@/components/common/section-title";
import Image from "next/image";

export default function ContactMe() {
  return (
    <section className="w-full bg-foreground text-background" id="contact">
      <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionTitle index="04">Contact</SectionTitle>
          <p className="font-serif text-background/50">Say hello</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <ContactLink href="mailto:nandosobral03@gmail.com" icon="/icons/email.png" label="Email" />
          <ContactLink href="https://www.linkedin.com/in/fernando-sobral-2b100621b/" icon="/icons/linkedin.png" label="LinkedIn" />
          <ContactLink href="https://www.github.com/nandosobral03" icon="/icons/github.png" label="Github" />
        </div>
        <div className="h-px bg-background/10 mt-4" />
        <div className="flex items-center justify-between">
          <span className="meta-label text-background/30">&copy; {new Date().getFullYear()} <span className="text-accent/60">Fernando Sobral</span></span>
          <span className="meta-label text-background/30">Montevideo, Uruguay</span>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      className="group flex items-center gap-3"
    >
      <Image src={icon} alt={label} width={20} height={20} className="invert opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
      <span className="font-condensed font-bold uppercase tracking-wider text-background/40 group-hover:text-background/70 transition-colors duration-300">
        {label}
      </span>
    </a>
  );
}
