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
    <main className="flex flex-col items-center justify-start gap-4 w-full">
      <FootnoteProvider>
        <ExpandedImageProvider>
          <article className="flex flex-col items-center justify-start gap-4 w-article">
            {children}
            <Divider className="my-4" />
            <Footer />
          </article>
        </ExpandedImageProvider>
      </FootnoteProvider>
    </main>
  );
}
