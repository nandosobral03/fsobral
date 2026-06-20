import { clsx } from "clsx";
import type { CSSProperties } from "react";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
};

type SectionProps = CommonProps & {
  id?: string;
  style?: CSSProperties;
  tone?: "paper" | "ink";
};

export function EditorialSection({
  children,
  className,
  id,
  style,
  tone = "paper",
}: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={clsx(
        "editorial-section",
        tone === "ink" && "bg-foreground text-background",
        className,
      )}
    >
      <div className="editorial-wrap">{children}</div>
    </section>
  );
}

export function EditorialGrid({ children, className }: CommonProps) {
  return <div className={clsx("editorial-grid", className)}>{children}</div>;
}

export function ContentRail({
  children,
  className,
  width = "default",
}: CommonProps & { width?: "default" | "wide" | "article" }) {
  return (
    <div
      className={clsx(
        width === "article" ? "content-rail-article" : width === "wide" ? "content-rail-wide" : "content-rail",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StructuralRule({ className }: { className?: string }) {
  return <div className={clsx("structural-line", className)} />;
}

export function MetaLabel({ children, className }: CommonProps) {
  return <span className={clsx("meta-label", className)}>{children}</span>;
}
