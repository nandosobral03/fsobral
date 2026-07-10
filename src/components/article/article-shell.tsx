"use client";

import Image from "next/image";
import Tag from "@/components/common/tag";
import { useExpandedImage } from "./expanded-image-context";
import { ContentRail, EditorialSection, MetaLabel } from "@/components/common/editorial";
import { ROUTE_CARD_VIEW_TRANSITION_NAME } from "@/components/common/route-transition-provider";
import type { CSSProperties } from "react";
import ImageModal from "@/components/ImageModal";

type ViewTransitionStyle = CSSProperties & {
  viewTransitionName?: string;
};

type ArticleShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  date: string;
  readingTimeMinutes?: number;
  tags?: string[];
  coverImage?: string;
  enableRouteTransition?: boolean;
  children: React.ReactNode;
};

export default function ArticleShell({ eyebrow, title, description, date, readingTimeMinutes, tags, coverImage, enableRouteTransition = false, children }: ArticleShellProps) {
  const { image, clearImage } = useExpandedImage();
  const headerStyle: ViewTransitionStyle | undefined = enableRouteTransition
    ? { viewTransitionName: ROUTE_CARD_VIEW_TRANSITION_NAME }
    : undefined;

  return (
    <>
      {image && (
        <ImageModal imageUrl={image.src} altText={image.alt} onClose={clearImage} />
      )}

      <EditorialSection tone="ink" style={headerStyle}>
        <ContentRail width="wide" className="py-[calc(var(--lh)*4)] flex flex-col gap-[var(--lh)]">
          {eyebrow && <MetaLabel className="text-accent">{eyebrow}</MetaLabel>}
          <h1 className="display-title text-4xl md:text-6xl text-background">{title}</h1>
          {description && <div className="editorial-copy text-lg md:text-xl text-background/88">{description}</div>}
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
                <Tag key={tag} className="border-background/25 bg-transparent text-background/70">{tag}</Tag>
              ))}
            </div>
          )}
        </ContentRail>
      </EditorialSection>

      <EditorialSection className="py-[calc(var(--lh)*2)]">
        <ContentRail width="article">
        {coverImage && (
          <div className="mb-[calc(var(--lh)*2)] frame overflow-hidden bg-foreground">
            <Image src={coverImage} alt={title} width={1600} height={900} className="w-full h-auto" />
          </div>
        )}
          <article className="flex flex-col gap-[var(--lh)]">{children}</article>
        </ContentRail>
      </EditorialSection>
    </>
  );
}
