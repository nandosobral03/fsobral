const CREATURE = `/ᐠ｡ꞈ｡ᐟ\\  < hello! >`;

export default function OverscrollCreature() {
  return (
    <pre
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[1] pointer-events-none text-foreground/50 text-sm font-mono leading-tight select-none"
      aria-hidden="true"
    >
      {CREATURE}
    </pre>
  );
}
