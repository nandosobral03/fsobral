import type { CalendarData } from "./github-activity";

export const HEATMAP_GAP = 2;
export const HEATMAP_TARGET_CELL = 14;
export const HEATMAP_SWEEP_DURATION_MS = 1000;
export const HEATMAP_DARK_COLOR = "#1a1917";
export const HEATMAP_COLORS = ["#1d1d1d", "#4a1e14", "#7a2d1a", "#a63a1f", "#d44527", "#e8603a"];
export const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const placeholderDay: CalendarData = { date: "", count: 0, level: 0, weekday: 0 };

export function getContributionQuartiles(calendarData: CalendarData[]) {
  const nonZero = calendarData.map((day) => day.count).filter((count) => count > 0).sort((a, b) => a - b);
  if (nonZero.length === 0) return [1, 2, 3, 4];
  const q = (p: number) => nonZero[Math.max(0, Math.ceil(p * nonZero.length) - 1)];
  return [q(0.25), q(0.5), q(0.75), q(1)];
}

export function getContributionLevel(count: number, quartiles: number[]) {
  if (count === 0) return 0;
  if (count <= quartiles[0]) return 1;
  if (count <= quartiles[1]) return 2;
  if (count <= quartiles[2]) return 3;
  if (count < quartiles[3]) return 4;
  return 5;
}

export function getContributionColor(count: number, quartiles: number[]) {
  return HEATMAP_COLORS[getContributionLevel(count, quartiles)];
}

export function createHeatmapWeeks(calendarData: CalendarData[], weekCount: number, fillEmpty: boolean) {
  const required = weekCount * 7;
  let displayData = calendarData.slice(-required);
  if (fillEmpty && displayData.length < required) {
    const deficit = required - displayData.length;
    const filler: CalendarData[] = Array.from({ length: deficit }, (_, idx) => ({
      ...placeholderDay,
      weekday: idx % 7,
    }));
    displayData = [...filler, ...displayData];
  }

  const weeks: CalendarData[][] = [];
  for (let i = 0; i < displayData.length; i += 7) {
    const week = displayData.slice(i, i + 7);
    week.sort((a, b) => a.weekday - b.weekday);
    weeks.push(week);
  }
  return weeks;
}

export function getHeatmapMonthLabels(weeks: CalendarData[][]) {
  const labels: { weekIndex: number; label: string; isYear: boolean }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    const firstOfMonth = week.find((day) => {
      if (!day.date) return false;
      return parseInt(day.date.split("-")[2], 10) === 1;
    });
    if (!firstOfMonth) return;

    const date = new Date(`${firstOfMonth.date}T00:00:00`);
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month !== lastMonth) {
      labels.push({ weekIndex, label: month === 0 ? `${year}` : MONTHS_SHORT[month], isYear: month === 0 });
      lastMonth = month;
    }
  });

  return labels;
}

export function getVisibleHeatmapWeekCount(width: number, availableWeeks: number, forceVertical: boolean) {
  if (forceVertical || width < 500) {
    return Math.min(availableWeeks, 52);
  }
  const maxWeeks = Math.floor(width / (HEATMAP_TARGET_CELL + HEATMAP_GAP));
  return Math.min(maxWeeks, availableWeeks);
}
