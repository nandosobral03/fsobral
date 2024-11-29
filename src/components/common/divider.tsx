export default function Divider({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  return <div className={`bg-foreground ${orientation === "vertical" ? "w-[3px] min-h-full" : "h-[3px] w-full"}`} />;
}
