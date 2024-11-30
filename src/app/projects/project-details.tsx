"use client";

import { Fragment, useState } from "react";
import Divider from "@/components/common/divider";
import { Project } from "@/server/projects";
import Image from "next/image";
import Link from "next/link";
import ImageModal from "@/components/ImageModal";

export default function ProjectDetails({ project }: { project: Project }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto px-4 py-8">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold uppercase">{project.name}</h1>
        <div className="flex gap-4">
          {project.links.map((link) => (
            <Link key={link.url} href={link.url} target="_blank" className="px-4 py-2 bg-foreground text-background hover:opacity-80 uppercase">
              {link.name}
            </Link>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-4 italic bg-foreground text-background p-4 ">{project.preview.description}</div>

      <div className="aspect-video relative w-full">
        <Image src={project.preview.cover} alt={`${project.name} preview`} fill className="object-cover" />
      </div>

      <Divider />

      <div className="flex flex-col gap-8">
        {project.sections.map((section, index) => (
          <Fragment key={`section-${index}`}>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold uppercase">{section.title}</h2>
              <div className="prose prose-invert max-w-none text-pretty">{section.component}</div>
            </section>
            <Divider />
          </Fragment>
        ))}
      </div>

      {project.images && (
        <>
          <h2 className="text-2xl font-semibold uppercase">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <div key={`image-${index}`} className="aspect-video relative w-full cursor-pointer bg-foreground" onClick={() => setSelectedImage(image)}>
                <Image src={image.url} alt={image.alt} fill className={`object-cover ${image.isMobile ? "object-scale-down" : ""}`} />
              </div>
            ))}
          </div>
        </>
      )}

      {selectedImage && <ImageModal imageUrl={selectedImage.url} altText={selectedImage.alt} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}
