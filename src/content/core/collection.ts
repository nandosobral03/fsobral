import { compareNewestFirst, parseDisplayDate } from "./dates";
import { contentPath, decodeRouteParam, toContentSlug } from "./routes";

export type NormalizedFields = {
  slug: string;
  path: string;
  dateIso?: string;
  dateTimestamp?: number;
};

export type RoutableEntry = {
  slug: string;
  path: string;
  hidden?: boolean;
  dateTimestamp?: number;
};

export type ContentCollection<TEntry extends RoutableEntry> = {
  all(): readonly TEntry[];
  visible(): readonly TEntry[];
  bySlug(slug: string): TEntry | undefined;
  fromRouteParam(param: string): TEntry | undefined;
};

type DefineCollectionOptions<TSource, TEntry extends RoutableEntry> = {
  name: string;
  basePath: string;
  sources: readonly TSource[];
  getTitle: (source: TSource) => string;
  getSlug?: (source: TSource) => string | undefined;
  getDate?: (source: TSource) => string | undefined;
  sortByDateDesc?: boolean;
  makeEntry: (source: TSource, fields: NormalizedFields) => TEntry;
  matchRouteParam?: (entry: TEntry, decodedParam: string) => boolean;
  validateEntry?: (entry: TEntry) => void;
};

function assertUnique<TEntry extends RoutableEntry>(
  entries: readonly TEntry[],
  key: "slug" | "path",
  collectionName: string
) {
  const seen = new Map<string, TEntry>();

  for (const entry of entries) {
    const value = entry[key];
    const existing = seen.get(value);
    if (existing) {
      throw new Error(`${collectionName} has duplicate ${key}: ${value}`);
    }
    seen.set(value, entry);
  }
}

export function defineCollection<TSource, TEntry extends RoutableEntry>({
  name,
  basePath,
  sources,
  getTitle,
  getSlug,
  getDate,
  sortByDateDesc = false,
  makeEntry,
  matchRouteParam,
  validateEntry,
}: DefineCollectionOptions<TSource, TEntry>): ContentCollection<TEntry> {
  const entries = sources.map((source) => {
    const title = getTitle(source).trim();
    if (!title) {
      throw new Error(`${name} contains an entry with an empty title`);
    }

    const slug = (getSlug?.(source) ?? toContentSlug(title)).trim();
    if (!slug) {
      throw new Error(`${name} contains an entry with an empty slug`);
    }

    const date = getDate?.(source);
    const dateFields = date ? parseDisplayDate(date, `${name}/${slug}`) : {};
    const entry = makeEntry(source, {
      slug,
      path: contentPath(basePath, slug),
      ...dateFields,
    });

    validateEntry?.(entry);
    return entry;
  });

  assertUnique(entries, "slug", name);
  assertUnique(entries, "path", name);

  const orderedEntries = Object.freeze(
    sortByDateDesc ? [...entries].sort(compareNewestFirst) : [...entries]
  );
  const visibleEntries = Object.freeze(orderedEntries.filter((entry) => !entry.hidden));
  const bySlug = new Map(orderedEntries.map((entry) => [entry.slug, entry]));

  return {
    all: () => orderedEntries,
    visible: () => visibleEntries,
    bySlug: (slug: string) => bySlug.get(slug),
    fromRouteParam: (param: string) => {
      const decoded = decodeRouteParam(param);
      return bySlug.get(decoded) ?? orderedEntries.find((entry) => matchRouteParam?.(entry, decoded));
    },
  };
}
