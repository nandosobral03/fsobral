"use client";

import { useExpandedImage } from "@/components/article/expanded-image-context";
import React from "react";

interface ImageWithAltProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

const ImageWithAlt = ({ src, alt, children }: ImageWithAltProps) => {
  const { setImage } = useExpandedImage();

  return (
    <figure className="relative my-[var(--lh)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="frame w-full cursor-pointer bg-foreground transition-all duration-300 hover:border-accent" onClick={() => setImage({ src, alt })} />
      {children && (
        <figcaption className="mt-[var(--bl)] border-l-2 border-accent pl-[var(--bl)] text-start editorial-copy text-sm text-foreground/60">
          {children}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageWithAlt;
