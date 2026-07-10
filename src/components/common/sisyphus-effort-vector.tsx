const EFFORT_PATH =
  "M176 1476C267 1378 329 1248 371 1080C424 868 427 645 564 492C701 339 891 278 1081 177C1149 141 1200 113 1240 94";

export default function SisyphusEffortVector({
  layer,
}: {
  layer: "behind" | "front";
}) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      fill="none"
      focusable="false"
      preserveAspectRatio="xMinYMid meet"
      viewBox="0 0 1410 1600"
    >
      {layer === "behind" ? (
        <>
          <path
            d={EFFORT_PATH}
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M158 1499h.01"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M146 1515h.01"
            opacity=".72"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M136 1529h.01"
            opacity=".48"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M1261 79h.01"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1278 67h.01"
            opacity=".72"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1293 57h.01"
            opacity=".48"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : (
        <path
          d={EFFORT_PATH}
          pathLength="100"
          stroke="var(--color-accent)"
          strokeDasharray="12 48 14 26"
          strokeLinecap="round"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
