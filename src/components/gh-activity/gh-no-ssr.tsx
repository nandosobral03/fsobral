"use client";

import GithubActivityClient from "./gh-activity-heatmap";
import NoSsrWrapper from "../common/no-ssr-wrapper";
interface CalendarData {
  date: string;
  count: number;
  level: number;
  weekday: number;
}

export default function GHActivityForceNoSSR({ calendarData }: { calendarData: CalendarData[] }) {
  return (
    <NoSsrWrapper>
      <GithubActivityClient calendarData={calendarData} />
    </NoSsrWrapper>
  );
}
