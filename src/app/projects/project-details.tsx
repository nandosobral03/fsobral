"use client";

import { Fragment, useState } from "react";
import Divider from "@/components/common/divider";
import { Project } from "@/app/projects/projects";
import Image from "next/image";
import Link from "next/link";
import ImageModal from "@/components/ImageModal";

export default function ProjectDetails({ project }: { project: Project }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  return (
    <>
      {/* Dark intro section */}
      <div className="w-full bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 py-28 flex flex-col gap-6">
          <h1 className="text-5xl md:text-7xl font-bold uppercase font-condensed tracking-wide">{project.name}</h1>
          <div className="text-lg md:text-xl font-light leading-relaxed">{project.preview.description}</div>
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
        </div>
      </div>

      <div className="h-16" />
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="aspect-video relative w-full frame overflow-hidden mb-12">
          <Image src={project.preview.cover} alt={`${project.name} preview`} fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-12">
          {project.sections.map((section, index) => (
            <Fragment key={`section-${index}`}>
              <section className="flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl font-bold uppercase font-condensed tracking-wide  pb-2 inline-block">{section.title}</h2>
                <div className="prose prose-invert max-w-none text-pretty text-base md:text-lg leading-relaxed">{section.component}</div>
              </section>
              {index < project.sections.length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>

        {project.images && (
          <>
            <Divider className="my-12" />
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold uppercase font-condensed tracking-wide  pb-2 inline-block">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </>
  );
}
