"use client";

import Image from "next/image";
import Tag from "@/components/common/tag";
import { useExpandedImage } from "./expanded-image-context";

type ArticleShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  date: string;
  readingTimeMinutes?: number;
  tags?: string[];
  coverImage?: string;
  children: React.ReactNode;
};

export default function ArticleShell({ eyebrow, title, description, date, readingTimeMinutes, tags, coverImage, children }: ArticleShellProps) {
  const { image, clearImage } = useExpandedImage();

  return (
    <>
      {image && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-75 object-contain" onClick={clearImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="w-full cursor-pointer transition-all duration-300 fixed m-auto inset-0 z-50 h-[90vh] object-contain" onClick={clearImage} />
        </div>
      )}

      <div className="w-full bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 py-28 flex flex-col gap-6">
          {eyebrow && <p className="text-xs uppercase tracking-[0.3em] font-semibold text-accent">{eyebrow}</p>}
          <h1 className="text-4xl md:text-6xl font-bold uppercase font-condensed tracking-wide leading-tight">{title}</h1>
          {description && <div className="text-lg md:text-xl font-light leading-relaxed opacity-90">{description}</div>}
          <div className="flex flex-wrap items-center gap-4 text-sm uppercase font-condensed">
            <span className="text-accent">{date}</span>
            {readingTimeMinutes && (
              <>
                <span className="text-background/60">-</span>
                <span className="text-background/80">{readingTimeMinutes} min read</span>
              </>
            )}
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-16" />

      <div className="max-w-4xl mx-auto px-6 pb-12">
        {coverImage && (
          <div className="mb-12 frame overflow-hidden">
            <Image src={coverImage} alt={title} width={1600} height={900} className="w-full h-auto" />
          </div>
        )}
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </>
  );
}
