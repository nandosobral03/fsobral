import React from "react";
import { clsx } from "clsx";

type TagProps = {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Tag({ children, interactive = false, className = "", onClick }: TagProps) {
  return (
    <span className={clsx("meta-label border border-accent/40 bg-transparent px-3 py-1 text-current select-none", className)} onClick={interactive ? onClick : undefined}>
      {children}
    </span>
  );
}
