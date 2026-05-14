"use client";

import Divider from "@/components/common/divider";
import Footer from "@/app/blog/components/footer";
import ArticleProviders from "@/components/article/article-providers";

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ArticleProviders>
      {children}
      <div className="max-w-4xl mx-auto mt-12">
        <Divider className="mx-6" />
        <div className="px-6">
          <Footer />
        </div>
      </div>
    </ArticleProviders>
  );
}
