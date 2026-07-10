"use client";


export default function TechStack() {
  const mainStack = [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Next.js",
    "tRPC",
  ];
  const alsoInterestedIn = ["Rust", "Python", "Svelte", "TanStack Start"];

  return (
    <section className="[grid-column:1/-1] md:[grid-column:7/13] flex flex-col justify-center gap-[calc(var(--lh)*1.5)] relative">
      <div className="flex flex-col gap-[var(--bl)]">
        <p className="meta-label text-background/30">Stack</p>
        <div className="flex flex-wrap gap-2">
          {mainStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 border border-accent/40 text-background font-condensed font-semibold text-sm hover:border-accent/70 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[var(--bl)]">
        <p className="meta-label text-background/30">Also Interested In</p>
        <div className="flex flex-wrap gap-2">
          {alsoInterestedIn.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 border border-background/20 text-background/50 font-condensed font-semibold text-sm hover:border-background/40 hover:text-background/70 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
