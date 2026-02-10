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
    <span className={clsx("text-xs font-condensed px-3 py-1 border-2 border-foreground bg-foreground select-none text-background", className)} onClick={interactive ? onClick : undefined}>
      {children}
    </span>
  );
}
