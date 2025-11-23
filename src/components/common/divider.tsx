export default function Divider({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  return <div className={`bg-foreground ${orientation === "vertical" ? "w-1 my-4 mx-4" : "h-1 my-4 mx-4"} ${className}`} />;
}
