import type { Metadata } from "next";
import type { PostMetadata } from "@/app/blog/posts-data";
import type { Project } from "@/app/projects/projects";

export const site = {
  name: "Fernando Sobral",
  domain: "fernandosobral.dev",
  defaultTitle: "Fernando Sobral",
  description: "Software engineer and builder of things on the internet.",
  author: "Fernando Sobral",
  sameAs: [
    "https://github.com/nandosobral03",
    "https://www.linkedin.com/in/fernando-sobral-2b100621b/",
  ],
};

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://fsobral.com";
}

export function getLocalBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function canonicalUrl(path = "/", base = getBaseUrl()) {
  return new URL(path, base).toString();
}

export function personJsonLd(base = getBaseUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: base,
    sameAs: site.sameAs,
  };
}

export function blogPostJsonLd(post: PostMetadata, base = getBaseUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: site.author },
    url: canonicalUrl(`/blog/${post.slug}`, base),
    ...(post.coverImage ? { image: canonicalUrl(post.coverImage, base) } : {}),
    ...(post.tags ? { keywords: post.tags.join(", ") } : {}),
  };
}

export function projectJsonLd(project: Project, base = getBaseUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.preview.description,
    url: canonicalUrl(project.path ?? `/projects/${encodeURIComponent(project.name)}`, base),
    image: canonicalUrl(project.preview.cover, base),
    author: { "@type": "Person", name: site.author },
  };
}

export function articleMetadata(post: PostMetadata): Metadata {
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export function projectMetadata(project: Project): Metadata {
  return {
    title: project.name,
    description: project.preview.description,
    openGraph: {
      type: "website",
      title: project.name,
      description: project.preview.description,
      images: [{ url: project.preview.cover }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.preview.description,
    },
  };
}
