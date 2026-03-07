import SectionTitle from "@/components/common/section-title";

export default function ContactMe() {
  return (
    <section className="w-full bg-foreground text-background" id="contact">
      <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col">
        <SectionTitle index="04">Contact</SectionTitle>

        {/* Contact links */}
        <div className="flex flex-col md:flex-row mt-8">
          <a href="mailto:nandosobral03@gmail.com" className="group block py-4 md:pr-12 border-b md:border-b-0 md:border-r border-background/10 hover:border-accent transition-colors duration-300">
            <span className="meta-label text-background/30 block mb-2">Email</span>
            <span className="text-xl md:text-2xl lg:text-3xl font-condensed font-bold uppercase tracking-wide text-background/70 group-hover:text-accent transition-colors duration-300">
              Say Hello
            </span>
          </a>
          <a href="https://www.linkedin.com/in/fernando-sobral-2b100621b/" target="_blank" rel="noopener noreferrer" className="group block py-4 md:px-12 border-b md:border-b-0 md:border-r border-background/10 hover:border-accent transition-colors duration-300">
            <span className="meta-label text-background/30 block mb-2">LinkedIn</span>
            <span className="text-xl md:text-2xl lg:text-3xl font-condensed font-bold uppercase tracking-wide text-background/70 group-hover:text-accent transition-colors duration-300">
              Let&apos;s Connect
            </span>
          </a>
          <a href="https://www.github.com/nandosobral03" target="_blank" rel="noopener noreferrer" className="group block py-4 md:pl-12">
            <span className="meta-label text-background/30 block mb-2">Github</span>
            <span className="text-xl md:text-2xl lg:text-3xl font-condensed font-bold uppercase tracking-wide text-background/70 group-hover:text-accent transition-colors duration-300">
              See My Code
            </span>
          </a>
        </div>

        {/* Colophon */}
        <div className="h-px bg-background/10 mt-10" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mt-6">
          <span className="meta-label text-background/30">&copy; {new Date().getFullYear()} <span className="text-accent">Fernando Sobral</span></span>
          <span className="meta-label text-background/30">Montevideo, Uruguay</span>
        </div>
      </div>
    </section>
  );
}
