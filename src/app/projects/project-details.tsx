"use client";

import { Fragment, useState } from "react";
import Divider from "@/components/common/divider";
import type { ProjectEntry } from "@/content";
import Image from "next/image";
import Link from "next/link";
import ImageModal from "@/components/ImageModal";
import { ContentRail, EditorialSection } from "@/components/common/editorial";
import { ROUTE_CARD_VIEW_TRANSITION_NAME } from "@/components/common/route-transition-provider";

export default function ProjectDetails({ project }: { project: ProjectEntry }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  return (
    <>
      <EditorialSection tone="ink" style={{ viewTransitionName: ROUTE_CARD_VIEW_TRANSITION_NAME }}>
        <ContentRail width="wide" className="py-[calc(var(--lh)*4)] flex flex-col gap-[var(--lh)]">
          <h1 className="display-title text-5xl md:text-7xl text-background">{project.name}</h1>
          <div className="editorial-copy text-lg md:text-xl text-background/88">{project.preview.description}</div>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                className="px-6 py-3 border-[3px] border-background bg-transparent text-background hover:bg-accent hover:border-accent hover:text-foreground transition-all duration-300 uppercase font-semibold font-condensed"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </ContentRail>
      </EditorialSection>

      <EditorialSection className="py-[calc(var(--lh)*2)] pb-[calc(var(--lh)*4)]">
        <ContentRail width="article">
        <div className="aspect-video relative w-full frame overflow-hidden mb-[calc(var(--lh)*2)] bg-foreground">
          <Image src={project.preview.cover} alt={`${project.name} preview`} fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-[calc(var(--lh)*2)]">
          {project.sections.map((section, index) => (
            <Fragment key={`section-${index}`}>
              <section className="flex flex-col gap-[var(--lh)]">
                <h2 className="display-title text-3xl md:text-4xl">{section.title}</h2>
                <div className="editorial-copy max-w-none text-base md:text-lg">{section.component}</div>
              </section>
              {index < project.sections.length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>

        {project.images && (
          <>
            <Divider className="my-[calc(var(--lh)*2)]" />
            <div className="flex flex-col gap-[var(--lh)]">
              <h2 className="display-title text-3xl md:text-4xl">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--lh)]">
                {project.images.map((image, index) => (
                  <div key={`image-${index}`} className="aspect-video relative w-full cursor-pointer frame hover:border-accent transition-all duration-300 overflow-hidden" onClick={() => setSelectedImage(image)}>
                    <Image src={image.url} alt={image.alt} fill className={`object-cover ${image.isMobile ? "object-scale-down" : ""}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedImage && <ImageModal imageUrl={selectedImage.url} altText={selectedImage.alt} onClose={() => setSelectedImage(null)} />}
        </ContentRail>
      </EditorialSection>
    </>
  );
}
