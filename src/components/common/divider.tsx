export default function Divider({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  return <div className={`bg-foreground ${orientation === "vertical" ? "w-px my-[var(--lh)] mx-[var(--lh)]" : "h-px my-[var(--lh)]"} ${className}`} />;
}
