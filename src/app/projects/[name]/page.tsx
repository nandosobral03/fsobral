import NotFound from "@/components/sections/NotFound";
import ProjectDetails from "@/app/projects/project-details";
import { projects } from "@/content";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const project = projects.fromRouteParam(name);
  if (!project) return {};
  return projects.metadata(project);
}

export default async function ProjectPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const project = projects.fromRouteParam(resolvedParams.name);

  if (!project) {
    return <NotFound type="project" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projects.jsonLd(project)) }} />
      <ProjectDetails project={project} />
    </>
  );
}
