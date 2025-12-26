"use client";

import { FootnoteProvider } from "@/app/blog/context/FootnoteContext";
import { ExpandedImageProvider } from "@/app/blog/context/ExpandedImageContext";

export default function MarginaliaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FootnoteProvider>
      <ExpandedImageProvider>{children}</ExpandedImageProvider>
    </FootnoteProvider>
  );
}
