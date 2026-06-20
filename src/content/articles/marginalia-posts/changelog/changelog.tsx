import { entries, type ChangelogTag } from "./changelog-entries";

const tagSymbols: Record<ChangelogTag, string> = {
  added: "+",
  improved: "~",
  fixed: "*",
};

const tagColors: Record<ChangelogTag, string> = {
  added: "text-accent",
  improved: "text-foreground",
  fixed: "text-foreground",
};

function groupByMonth(items: typeof entries) {
  const groups: { label: string; entries: (typeof entries)[number][] }[] = [];
  const map = new Map<string, (typeof entries)[number][]>();

  for (const entry of items) {
    const [year, month] = entry.date.split("-");
    const key = `${year}-${month}`;
    if (!map.has(key)) {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
      const label = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
      map.set(key, []);
      groups.push({ label, entries: map.get(key)! });
    }
    map.get(key)!.push(entry);
  }

  return groups;
}

function formatDay(dateStr: string) {
  const [, month, day] = dateStr.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
}

export default function Changelog() {
  const sorted = [...entries].sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
  const groups = groupByMonth(sorted);

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.label} className="not-first:border-t not-first:border-foreground not-first:pt-6">
          <h2 className="font-condensed font-bold uppercase tracking-[0.2em] text-foreground mb-4">
            {group.label}
          </h2>

          <div className="flex flex-col gap-0">
            {group.entries.map((entry, i) => (
              <div
                key={`${entry.date}-${i}`}
                className="grid grid-cols-[1rem_4rem_minmax(0,1fr)] items-start gap-3 py-3 md:grid-cols-[5.75rem_4.5rem_minmax(0,1fr)] md:gap-4"
              >
                <span
                  className={`flex items-center gap-2 pt-0.5 ${tagColors[entry.tag]}`}
                  title={entry.tag}
                >
                  <span className="font-mono text-sm font-bold leading-none">
                    {tagSymbols[entry.tag]}
                  </span>
                  <span className="hidden font-condensed text-[9px] font-medium uppercase tracking-[0.12em] md:inline">
                    {entry.tag}
                  </span>
                </span>

                <span className="shrink-0 pt-0.5 font-serif text-xs tabular-nums text-foreground/40">
                  {formatDay(entry.date)}
                </span>

                <p className="min-w-0 text-sm leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
