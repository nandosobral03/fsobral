"use client";

import Image from "next/image";

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}
export default function ImageModal({ imageUrl, altText, onClose }: ImageModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <Image src={imageUrl} alt={altText} width={1280} height={960} className="object-contain max-h-[90vh] max-w-[90vw] h-fit w-fit" />
        <p className="text-white text-lg">{altText}</p>
      </div>
    </div>
  );
}
