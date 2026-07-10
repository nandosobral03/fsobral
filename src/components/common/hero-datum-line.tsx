export default function HeroDatumLine({
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
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 950 412"
    >
      {layer === "behind" ? (
        <>
          <path
            d="M457 150 420 260"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="1.75"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M459.5 142.5h.01"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="3.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M461.5 136.5h.01"
            opacity=".78"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M463.5 131h.01"
            opacity=".58"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M417.5 267.5h.01"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="3.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M415.5 273.5h.01"
            opacity=".78"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M413.5 279h.01"
            opacity=".58"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : (
        <path
          d="M437 210 427.5 238"
          stroke="var(--color-accent)"
          strokeLinecap="round"
          strokeWidth="1.75"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
