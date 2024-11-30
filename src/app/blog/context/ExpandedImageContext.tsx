"use client";

import { ReactNode, createContext, useCallback, useContext, useState } from "react";

type Image = {
  src: string;
  alt: string;
};

type ExpandedImageContextType = {
  image: Image | undefined;
  setImage: (image: Image) => void;
  clearImage: () => void;
};

const ExpandedImageContext = createContext<ExpandedImageContextType | undefined>(undefined);

export const useExpandedImage = () => {
  const context = useContext(ExpandedImageContext);
  if (!context) {
    throw new Error("useExpandedImage must be used within a ExpandedImageProvider");
  }
  return context;
};

export const ExpandedImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<Image | undefined>(undefined);

  const setImageCallback = useCallback((image: Image) => {
    setImage(image);
  }, []);

  return <ExpandedImageContext.Provider value={{ image, setImage: setImageCallback, clearImage: () => setImage(undefined) }}>{children}</ExpandedImageContext.Provider>;
};
