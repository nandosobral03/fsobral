const FOOTNOTE_CONNECTOR = "M1313 425H1525V690H2190";

export default function ThinkerThoughtAnnotation({
  layer,
}: {
  layer: "behind" | "front";
}) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
      fill="none"
      focusable="false"
      preserveAspectRatio="xMinYMid meet"
      viewBox="0 0 1996 2139"
    >
      {layer === "behind" ? (
        <>
          {/* The thinking gesture becomes an editorial footnote connector. */}
          <path
            d={FOOTNOTE_CONNECTOR}
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M2242 690h.01"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M2286 690h.01"
            opacity=".72"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M2326 690h.01"
            opacity=".48"
            stroke="var(--color-accent)"
            strokeLinecap="round"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : (
        <>
          {/* Only the numbered contact resurfaces; the connector then slips behind the profile. */}
          <path
            d={FOOTNOTE_CONNECTOR}
            pathLength="100"
            stroke="var(--color-accent)"
            strokeDasharray="9 91"
            strokeLinecap="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="1313"
            cy="425"
            r="7"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x="1350"
            y="378"
            fill="var(--color-accent)"
            fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
            fontSize="48"
            letterSpacing="5"
          >
            01
          </text>
        </>
      )}
    </svg>
  );
}
