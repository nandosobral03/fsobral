"use client";

import { useExpandedImage } from "@/app/blog/context/ExpandedImageContext";
import React from "react";

interface ImageWithAltProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

const ImageWithAlt = ({ src, alt, children }: ImageWithAltProps) => {
  const { setImage } = useExpandedImage();

  return (
    <figure className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`w-full cursor-pointer transition-all duration-300`} onClick={() => setImage({ src, alt })} />
      <figcaption className="text-start text-sm font-thin italic mt-2">{children}</figcaption>
    </figure>
  );
};

export default ImageWithAlt;
