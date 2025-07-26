export default function Divider({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  return <div className={`bg-foreground ${orientation === "vertical" ? "w-1 min-h-full" : "h-1 w-full"} ${className}`} />;
}
