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

          <div className="pl-6 flex flex-col gap-0">
            {group.entries.map((entry, i) => (
              <div
                key={`${entry.date}-${i}`}
                className="group relative py-3 flex items-start gap-4"
              >
                {/* tag symbol on the timeline */}
                <span className={`absolute -left-6 top-[13px] -translate-x-1/2 text-sm font-mono font-bold leading-none ${tagColors[entry.tag]}`}>
                  {tagSymbols[entry.tag]}
                </span>
                {/* tag label on hover */}
                <span className={`absolute -left-10 top-[11px] -translate-x-full text-[10px] font-condensed font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity ${tagColors[entry.tag]}`}>
                  {entry.tag}
                </span>

                <span className="shrink-0 w-16 text-xs font-serif text-foreground/40 pt-0.5 tabular-nums">
                  {formatDay(entry.date)}
                </span>

                <p className="flex-1 text-sm leading-relaxed">
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
