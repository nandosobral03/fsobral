"use client";

import React, { useState } from "react";

import ImageWithAlt from "./image-with-alt";

interface Image {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
  children?: React.ReactNode;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToImage = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex((prevIndex) => {
      if (index < 0) return images.length - 1;
      if (index >= images.length) return 0;
      return index;
    });
  };
  if (images.length === 1) {
    return <ImageWithAlt src={images[0].src} alt={images[0].alt} />;
  }

  return (
    <div className="relative w-full">
      <div className={`overflow-hidden relative h-64`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${
              index === currentIndex ? "translate-x-0" : index === (currentIndex - 1 + images.length) % images.length ? "-translate-x-full" : "translate-x-full"
            }`}
            style={{
              zIndex: index === currentIndex ? 1 : 0,
              transform: `translateX(${index === currentIndex ? "0%" : index === (currentIndex - 1 + images.length) % images.length ? (direction > 0 ? "-100%" : "100%") : direction > 0 ? "100%" : "-100%"})`,
            }}
          >
            <ImageWithAlt src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-2 gap-1">
        {images.map((_, index) => (
          <button key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-accent" : "bg-gray-400"}`} onClick={() => goToImage(index)} />
        ))}
      </div>
      <figcaption className="text-start text-sm font-thin italic mt-2">{children}</figcaption>
    </div>
  );
};

export default ImageCarousel;
