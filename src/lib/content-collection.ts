export type ContentEntry = {
  slug: string;
  date: string;
  hidden?: boolean;
};

export function sortContentByDate<T extends ContentEntry>(entries: T[]) {
  return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getContentBySlug<T extends ContentEntry>(entries: T[], slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

export function getVisibleContent<T extends ContentEntry>(entries: T[]) {
  return entries.filter((entry) => !entry.hidden);
}
