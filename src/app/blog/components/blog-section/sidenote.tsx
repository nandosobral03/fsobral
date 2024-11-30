"use client";

import { useEffect, useState } from "react";

type SidenoteConfig = {
  side: "left" | "right";
  align: "start" | "center" | "end";
};

const Sidenote = ({ children, anchorText, config }: { children: React.ReactNode; anchorText: string; config?: SidenoteConfig }) => {
  const side = config?.side ?? "right";
  const align = config?.align ?? "start";
  const [anchorOrSidenoteIsHovered, setAnchorOrSidenoteIsHovered] = useState(false);

  useEffect(() => {
    const anchorElement = document.querySelector(`[data-anchor="${anchorText}"]`) as HTMLElement;
    const sidenoteElement = document.querySelector(`[data-sidenote="${anchorText}"]`) as HTMLElement;
    const anchorParent = anchorElement.parentElement;

    if (anchorElement && sidenoteElement && anchorParent) {
      const rect = anchorElement.getBoundingClientRect();
      const heightFromParent = rect.top - anchorParent.getBoundingClientRect().top;

      if (align === "start") {
        sidenoteElement.style.top = `${heightFromParent}px`;
      } else if (align === "center") {
        sidenoteElement.style.top = `${heightFromParent - rect.height / 2}px`;
      } else if (align === "end") {
        sidenoteElement.style.top = `${heightFromParent - rect.height}px`;
      }
    }
  }, [anchorText, side, align]);

  return (
    <>
      <a
        id={`${anchorText}-anchor`}
        href={`#${anchorText}-sidenote`}
        className={`border-b-2 border-dashed border-accent ${anchorOrSidenoteIsHovered ? "text-accent border-accent" : ""}`}
        data-anchor={anchorText}
        onMouseEnter={() => setAnchorOrSidenoteIsHovered(true)}
        onMouseLeave={() => setAnchorOrSidenoteIsHovered(false)}
      >
        {anchorText}
      </a>
      <div
        data-sidenote={anchorText}
        className={`absolute text-xs w-52 text-start ${side === "right" ? "-right-56" : "-left-56"} border-accent border-2 border-dashed rounded-sm p-3 transition-colors ${
          anchorOrSidenoteIsHovered ? "bg-foreground text-background border-transparent" : ""
        }`}
        id={`${anchorText}-sidenote`}
        onMouseEnter={() => setAnchorOrSidenoteIsHovered(true)}
        onMouseLeave={() => setAnchorOrSidenoteIsHovered(false)}
      >
        {children}
      </div>
    </>
  );
};

export default Sidenote;
