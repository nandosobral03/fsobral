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
    <section className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-8 relative">
      <div className="flex flex-col gap-4">
        <p className="meta-label text-background/40">Stack</p>
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

      <div className="flex flex-col gap-4">
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

      <div className="mt-auto" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="meta-label text-background/30 w-20 shrink-0">
            Role
          </span>
          <span className="text-sm font-serif text-background/70">
            Senior Software Engineer at{" "}
            <a
              href="https://www.doublehq.com"
              className="bg-[#5F63F5] text-white rounded-sm p-1 font-sans"
            >
              double
            </a>{" "}
            (YC S21)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="meta-label text-background/30 w-20 shrink-0">
            Location
          </span>
          <span className="text-sm font-serif text-background/70">
            Montevideo, Uruguay
          </span>
        </div>
      </div>
    </section>
  );
}
