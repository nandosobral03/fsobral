export type ParsedDisplayDate = {
  dateIso: string;
  dateTimestamp: number;
};

export function parseDisplayDate(date: string, label: string): ParsedDisplayDate {
  const parsed = new Date(date);
  const timestamp = parsed.getTime();

  if (!Number.isFinite(timestamp)) {
    throw new Error(`${label} has an invalid date: ${date}`);
  }

  return {
    dateIso: parsed.toISOString(),
    dateTimestamp: timestamp,
  };
}

export function compareNewestFirst(
  a: { dateTimestamp?: number },
  b: { dateTimestamp?: number }
) {
  return (b.dateTimestamp ?? 0) - (a.dateTimestamp ?? 0);
}
