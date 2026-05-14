"use client";

import { ReactNode } from "react";
import { ExpandedImageProvider } from "./expanded-image-context";
import { FootnoteProvider } from "./footnote-context";

export default function ArticleProviders({ children }: { children: ReactNode }) {
  return (
    <FootnoteProvider>
      <ExpandedImageProvider>{children}</ExpandedImageProvider>
    </FootnoteProvider>
  );
}
