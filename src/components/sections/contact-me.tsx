import SectionTitle from "@/components/common/section-title";
import ContactSunrise from "@/components/common/contact-sunrise";

export default function ContactMe({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`${standalone ? "min-h-[calc(100svh-2.5rem)]" : ""} w-full bg-foreground text-background`} id="contact">
      <div className={`${standalone ? "editorial-wrap min-h-[calc(100svh-2.5rem)]" : "px-8 md:px-12"} py-10 md:py-14 flex flex-col`}>
        {standalone ? (
          <div className="grid gap-[var(--lh)] md:grid-cols-12">
            <span className="meta-label on-ink-meta md:[grid-column:1/4]">Contact / 01</span>
            <div className="min-w-0 overflow-visible flex flex-col gap-[var(--bl)] md:[grid-column:4/13]">
              <h1 className="display-title whitespace-nowrap text-[clamp(3.25rem,9vw,8rem)] text-background">Contact</h1>
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-accent" />
                <span className="meta-label on-ink-meta">Open channel</span>
              </div>
              <p className="editorial-copy max-w-3xl text-background/75">
                Email is the clearest way to reach me; GitHub and LinkedIn are below.
              </p>
            </div>
          </div>
        ) : (
          <SectionTitle index="04">Contact</SectionTitle>
        )}

        {standalone && <ContactSunrise />}

        {/* Contact links */}
        <div className={`${standalone ? "mt-auto pt-[calc(var(--lh)*3)]" : "mt-8"} flex flex-col md:flex-row`}>
          <a href="mailto:nandosobral03@gmail.com" className="group block py-4 md:pr-12 border-b md:border-b-0 md:border-r border-background/10 hover:border-accent transition-colors duration-300">
            <span className="meta-label on-ink-meta block mb-2">Email</span>
            <span className={`${standalone ? "text-lg md:text-xl xl:text-2xl break-all" : "text-xl md:text-2xl lg:text-3xl"} font-condensed font-bold uppercase tracking-wide text-background/70 group-hover:text-accent transition-colors duration-300`}>
              {standalone ? "nandosobral03@gmail.com" : "Say Hello"}
            </span>
          </a>
          <a href="https://www.linkedin.com/in/fernando-sobral-2b100621b/" target="_blank" rel="noopener noreferrer" className="group block py-4 md:px-12 border-b md:border-b-0 md:border-r border-background/10 hover:border-accent transition-colors duration-300">
            <span className="meta-label on-ink-meta block mb-2">LinkedIn</span>
            <span className={`${standalone ? "text-lg md:text-xl xl:text-2xl" : "text-xl md:text-2xl lg:text-3xl"} font-condensed font-bold uppercase tracking-wide text-background/70 group-hover:text-accent transition-colors duration-300`}>
              {standalone ? "Fernando Sobral" : "Let's Connect"}
            </span>
          </a>
          <a href="https://www.github.com/nandosobral03" target="_blank" rel="noopener noreferrer" className="group block py-4 md:pl-12">
            <span className="meta-label on-ink-meta block mb-2">GitHub</span>
            <span className={`${standalone ? "text-lg md:text-xl xl:text-2xl" : "text-xl md:text-2xl lg:text-3xl"} font-condensed font-bold uppercase tracking-wide text-background/70 group-hover:text-accent transition-colors duration-300`}>
              {standalone ? "@nandosobral03" : "See My Code"}
            </span>
          </a>
        </div>

        {/* Colophon */}
        <div className="mt-10 flex flex-col gap-1 border-t border-background/10 pt-6 md:flex-row md:items-center md:justify-between">
          <span className="meta-label on-ink-meta">&copy; {new Date().getFullYear()} <span className="text-accent">Fernando Sobral</span></span>
          <span className="meta-label on-ink-meta">Montevideo, Uruguay</span>
        </div>
      </div>
    </section>
  );
}
