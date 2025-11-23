"use client";

import { ExpandedImageProvider, useExpandedImage } from "../context/ExpandedImageContext";
import { FootnoteProvider } from "../context/FootnoteContext";
import type { Post } from "../posts";
import Image from "next/image";
import Tag from "@/components/common/tag";
import ReactDOMServer from "react-dom/server";
import { useMemo } from "react";

const calculateReadingTimeMinutes = (components: React.ReactNode) => {
  try {
    const html = ReactDOMServer.renderToStaticMarkup(
      <FootnoteProvider>
        <ExpandedImageProvider>{components}</ExpandedImageProvider>
      </FootnoteProvider>
    );
    const words = html
      .replace(/<[^>]+>/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  } catch {
    // Fallback if rendering fails
    return 5;
  }
};

export default function Article({ post }: { post: Post }) {
  const { image, clearImage } = useExpandedImage();
  const readingTimeMinutes = useMemo(() => calculateReadingTimeMinutes(post.components), [post.components]);

  return (
    <>
      {image && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-75 object-contain" onClick={clearImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="w-full cursor-pointer transition-all duration-300 fixed m-auto inset-0 z-50 h-[90vh] object-contain" onClick={clearImage} />
        </div>
      )}

      {/* Dark intro section */}
      <div className="w-full bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold uppercase font-condensed tracking-wide leading-tight">{post.title}</h1>
          {(post.subtitle ?? post.description) && <div className="text-lg md:text-xl font-light leading-relaxed opacity-90">{post.subtitle ?? post.description}</div>}
          <div className="flex flex-wrap items-center gap-4 text-sm uppercase font-condensed">
            <span className="text-accent">{post.date}</span>
            <span className="text-background/60">•</span>
            <span className="text-background/80">{readingTimeMinutes} min read</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-16" />

      <div className="max-w-4xl mx-auto px-6">
        {post.coverImage && (
          <div className="mb-12 border-[3px] border-foreground overflow-hidden">
            <Image src={post.coverImage} alt={post.title} width={1600} height={900} className="w-full h-auto" />
          </div>
        )}
        <div className="flex flex-col gap-4">{post.components}</div>
      </div>
    </>
  );
}
