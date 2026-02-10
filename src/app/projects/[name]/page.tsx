import NotFound from "@/components/sections/NotFound";
import ProjectDetails from "@/app/projects/project-details";
import { projects } from "@/app/projects/projects";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fsobral.com";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const project = projects.find((p) => p.name === decodedName);
  if (!project) return {};
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

export default async function ProjectPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const project = projects.find((project) => project.name === decodedName);

  if (!project) {
    return <NotFound type="project" />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.preview.description,
    url: `${siteUrl}/projects/${encodeURIComponent(project.name)}`,
    image: `${siteUrl}${project.preview.cover}`,
    author: { "@type": "Person", name: "Fernando Sobral" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetails project={project} />
    </>
  );
}
