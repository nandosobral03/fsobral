import { clsx } from "clsx";

type GraphicProps = { className?: string };

export function FeaturedWorkGraphic({
  items,
  className,
}: GraphicProps & {
  items: readonly { label: string; name: string; year: number; href: string }[];
}) {
  return (
    <nav aria-label="Selected project sequence" className={clsx("font-mono", className)}>
      <ol
        className="grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item, index) => (
          <li
            key={item.href}
            className="relative border-t border-foreground/25 first:border-accent"
          >
            <a
              href={item.href}
              className="group block min-h-20 pt-4 pr-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute -top-1 left-0 size-2 rounded-full border border-background transition-colors",
                  index === 0
                    ? "bg-accent"
                    : "bg-foreground/35 group-hover:bg-accent group-focus-visible:bg-accent",
                )}
              />
              <span className="flex items-baseline gap-2">
                <span className="text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-[0.14em] text-foreground/38">
                  {item.year}
                </span>
              </span>
              <span className="mt-2 block max-w-28 text-[10px] uppercase tracking-[0.1em] text-foreground/65 transition-colors group-hover:text-foreground">
                <span className="md:hidden xl:inline">{item.name}</span>
                <span className="hidden md:inline xl:hidden">{item.label}</span>
              </span>
            </a>
            {index === items.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-1 -top-[7px] bg-background pl-2 text-[9px] tracking-[0.18em] text-accent"
              >
                ···
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProjectArchiveGraphic({
  years,
  className,
}: GraphicProps & { years: readonly { year: number; count: number }[] }) {
  const latestYear = Math.max(...years.map((item) => item.year));

  return (
    <nav aria-label="Project archive chronology" className={clsx("font-mono", className)}>
      <ol
        className="grid"
        style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}
      >
        {years.map((item) => {
          const isLatest = item.year === latestYear;
          return (
            <li key={item.year} className="border-t border-background/25">
              <a
                href={`#projects-${item.year}`}
                className="group relative block min-h-16 pt-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    "absolute -top-1 left-0 size-2 rounded-full transition-colors",
                    isLatest
                      ? "bg-accent"
                      : "bg-background/35 group-hover:bg-accent group-focus-visible:bg-accent",
                  )}
                />
                <span
                  className={clsx(
                    "block text-[11px] transition-colors",
                    isLatest ? "text-accent" : "text-background/72 group-hover:text-background",
                  )}
                >
                  {item.year}
                </span>
                <span className="mt-1 block text-[8px] uppercase tracking-[0.12em] text-background/38">
                  {item.count} {item.count === 1 ? "project" : "projects"}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function WritingIndexGraphic({
  essays,
  marginalia,
  activeTab,
  className,
}: GraphicProps & {
  essays: number;
  marginalia: number;
  activeTab: "posts" | "marginalia";
}) {
  const isEssays = activeTab === "posts";
  const count = isEssays ? essays : marginalia;

  return (
    <div
      role="img"
      aria-label={
        isEssays
          ? `${essays} essays, represented as a continuous writing line`
          : `${marginalia} marginalia notes, represented as broken field-note marks`
      }
      className={clsx("font-mono", className)}
    >
      <div className="flex items-center gap-3">
        <span className="w-16 text-[8px] uppercase tracking-[0.14em] text-background/50">
          {isEssays ? "Essay" : "Note"}
        </span>
        <span aria-hidden="true" className="flex h-5 min-w-0 flex-1 items-center">
          {isEssays ? (
            <span className="flex w-full items-center gap-2">
              <span className="relative block h-px flex-1 bg-accent">
                <span className="absolute -top-[3px] left-0 size-[7px] rounded-full bg-accent" />
              </span>
              <span className="shrink-0 text-[8px] tracking-[0.16em] text-accent">···</span>
            </span>
          ) : (
            <span className="flex w-full items-center gap-[5px]">
              {[19, 31, 12, 25, 16].map((width, index) => (
                <span
                  key={`${width}-${index}`}
                  className="h-px bg-background/65"
                  style={{ width: `${width}%` }}
                />
              ))}
              <span className="shrink-0 text-[8px] tracking-[0.16em] text-accent">···</span>
            </span>
          )}
        </span>
        <span className="text-[10px] text-accent">{String(count).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

export function ProjectCaseStudyGraphic({
  year,
  sections,
  links,
  className,
}: GraphicProps & {
  year: number;
  sections: readonly { title: string; href: string }[];
  links: readonly { name: string; url: string }[];
}) {
  return (
    <nav
      aria-label={`${year} project case-study map`}
      className={clsx("w-full font-mono", className)}
    >
      <div className="flex items-baseline justify-between border-b border-background/15 pb-2">
        <span className="text-[9px] uppercase tracking-[0.14em] text-background/45">Case study</span>
        <span className="text-[10px] text-accent">{year}</span>
      </div>
      <div className="grid gap-5 pt-4 md:grid-cols-[minmax(0,1fr)_auto]">
        <ol
          className="grid min-w-0"
          style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
        >
          {sections.map((section, index) => (
            <li key={section.href} className="border-t border-background/30">
              <a
                href={section.href}
                className="group relative block min-h-14 pt-3 pr-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-1 left-0 size-2 rounded-full bg-background/40 transition-colors group-hover:bg-accent group-focus-visible:bg-accent"
                />
                <span className="block text-[8px] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-1 block truncate text-[8px] uppercase tracking-[0.08em] text-background/58 transition-colors group-hover:text-background">
                  {section.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
        {links.length > 0 && (
          <div className="relative flex flex-wrap items-start gap-x-4 gap-y-2 border-l border-accent/70 pl-4 md:max-w-52">
            <span className="absolute -left-1 top-0 size-2 rounded-full bg-accent" aria-hidden="true" />
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-[8px] uppercase tracking-[0.12em] text-background/58 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.name === "Github" ? "GitHub" : link.name} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
