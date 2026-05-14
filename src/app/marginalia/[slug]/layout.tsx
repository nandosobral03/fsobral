"use client";

import ArticleProviders from "@/components/article/article-providers";

export default function MarginaliaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ArticleProviders>{children}</ArticleProviders>
  );
}
