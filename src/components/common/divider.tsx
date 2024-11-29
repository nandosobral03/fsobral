export default function Divider({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  return <div className={`bg-foreground ${orientation === "vertical" ? "min-w-[3px] w-[3px] min-h-full" : "min-h-[3px] h-[3px] w-full"}`} />;
}
