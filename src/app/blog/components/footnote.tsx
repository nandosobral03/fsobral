"use client";

import React, { useEffect } from "react";

import { useFootnotes } from "@/app/blog/context/FootnoteContext";

type FootnoteProps = {
  footnote: string;
  children: React.ReactNode;
};

export default function Footnote({ footnote, children }: FootnoteProps) {
  const { addFootnote, getFootnoteIndex } = useFootnotes();

  useEffect(() => {
    addFootnote(footnote, children);
  }, [addFootnote, footnote, children]);

  const footnoteIndex = getFootnoteIndex(footnote);

  return (
    <span>
      {footnote}
      <sup id={`footnote-ref-${footnoteIndex}`}>
        <a href={`#footnote-${footnoteIndex}`} className="text-accent hover:text-foreground transition-colors">
          {footnoteIndex + 1}
        </a>
      </sup>
    </span>
  );
}
