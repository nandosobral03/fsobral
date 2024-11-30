"use client";

import { useFootnotes } from "@/app/blog/context/FootnoteContext";
import HoverableLink from "./hoverable-link";

export default function Footer() {
  const { footnotes } = useFootnotes();

  return (
    <footer className="flex flex-col items-center justify-center gap-4" id="all-footnotes">
      <div className="text-sm w-full items-start flex flex-col gap-2">
        {footnotes.map(({ content }, index) => (
          <div key={index} className="footnote-item flex gap-2" id={`footnote-${index}`}>
            <a href={`#footnote-ref-${index}`} className="text-accent hover:text-black" id={`footnote-ref-${index}`}>
              {index + 1}
            </a>
            {content}
          </div>
        ))}
      </div>
      <p className="text-sm">
        Liked the article? Have any questions, suggestions, or feedback? Feel free to send me an email at <HoverableLink href="mailto:nandosobral03@gmail.com">nandosobral03@gmail.com</HoverableLink> I&apos;d love hear your thoughts!
      </p>
      <p className="text-xs">
        Hated the article? You now despise me and everything I&apos;ve ever done. Feel free to send me an email at <HoverableLink href="mailto:hate+nandosobral03@gmail.com">hate+nandosobral03@gmail.com</HoverableLink> and let me know too!
      </p>
    </footer>
  );
}
