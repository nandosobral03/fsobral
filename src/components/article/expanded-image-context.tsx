"use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

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

  const setImageCallback = useCallback((nextImage: Image) => {
    setImage(nextImage);
  }, []);

  const clearImage = useCallback(() => setImage(undefined), []);
  const value = useMemo(() => ({ image, setImage: setImageCallback, clearImage }), [image, setImageCallback, clearImage]);

  return <ExpandedImageContext.Provider value={value}>{children}</ExpandedImageContext.Provider>;
};
