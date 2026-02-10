import Link from "next/link";

export default function NotFound({ type }: { type: "project" | "post" }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-6xl font-condensed uppercase font-extrabold text-foreground mb-2">404</h1>
      <h2 className="text-3xl font-condensed uppercase font-bold text-foreground/80 mb-4">{type === "project" ? "Project Not Found" : "Post Not Found"}</h2>
      <p className="text-lg text-foreground/60">Oops! The {type} you're looking for doesn't exist... yet.</p>
      <Link href="/" className="text-xl font-condensed uppercase font-extrabold text-foreground mb-2">
        Go Back
      </Link>
    </div>
  );
}
