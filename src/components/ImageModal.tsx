"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}
export default function ImageModal({ imageUrl, altText, onClose }: ImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-foreground/90 flex items-center justify-center z-50"
      onClick={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded image: ${altText}`}
    >
      <div className="relative flex flex-col items-center gap-4 px-4">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 border border-background bg-foreground px-3 py-2 text-background"
          aria-label="Close expanded image"
        >
          Close
        </button>
        <Image src={imageUrl} alt={altText} width={1280} height={960} className="object-contain max-h-[90vh] max-w-[90vw] h-fit w-fit" />
        <p className="text-background text-lg">{altText}</p>
      </div>
    </div>
  );
}
