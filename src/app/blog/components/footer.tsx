"use client";

import { useFootnotes } from "@/app/blog/context/FootnoteContext";
import HoverableLink from "./hoverable-link";

export default function Footer() {
  const { footnotes } = useFootnotes();

  return (
    <footer className="flex flex-col gap-8 mb-8 w-full" id="all-footnotes">
      {footnotes.length > 0 && (
        <div className="border-l-[3px] border-accent pl-6 flex flex-col gap-3">
          <h3 className="text-lg font-bold uppercase font-condensed tracking-wide">Footnotes</h3>
          <div className="text-sm flex flex-col gap-2">
            {footnotes.map(({ content }, index) => (
              <div key={index} className="footnote-item flex gap-3" id={`footnote-${index}`}>
                <a href={`#footnote-ref-${index}`} className="text-accent hover:text-foreground font-bold transition-colors" id={`footnote-ref-${index}`}>
                  [{index + 1}]
                </a>
                <div className="flex-1">{content}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="text-base leading-relaxed">
          <span className="font-bold">Liked the article?</span> Have any questions, suggestions, or feedback? Feel free to send me an email at <HoverableLink href="mailto:nandosobral03@gmail.com">nandosobral03@gmail.com</HoverableLink> —
          I&apos;d love to hear your thoughts!
        </div>
        <div className="text-sm leading-relaxed opacity-75">
          <span className="font-bold">Hated the article?</span> You now despise me and everything I&apos;ve ever done. Feel free to send me an email at{" "}
          <HoverableLink href="mailto:hate+nandosobral03@gmail.com">hate+nandosobral03@gmail.com</HoverableLink> and let me know too!
        </div>
      </div>
    </footer>
  );
}
