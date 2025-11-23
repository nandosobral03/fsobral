"use client";

import Divider from "@/components/common/divider";
import Footer from "@/app/blog/components/footer";
import { FootnoteProvider } from "@/app/blog/context/FootnoteContext";
import { ExpandedImageProvider } from "@/app/blog/context/ExpandedImageContext";

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FootnoteProvider>
      <ExpandedImageProvider>
        {children}
        <div className="max-w-4xl mx-auto mt-12">
          <Divider className="mx-6" />
          <div className="px-6">
            <Footer />
          </div>
        </div>
      </ExpandedImageProvider>
    </FootnoteProvider>
  );
}
