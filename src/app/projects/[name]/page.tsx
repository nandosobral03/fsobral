import NotFound from "@/components/sections/NotFound";
import ProjectDetails from "@/app/projects/project-details";
import { getProjectByRouteParam } from "@/app/projects/projects";
import { projectJsonLd, projectMetadata } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const project = getProjectByRouteParam(name);
  if (!project) return {};
  return projectMetadata(project);
}

export default async function ProjectPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const project = getProjectByRouteParam(resolvedParams.name);

  if (!project) {
    return <NotFound type="project" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }} />
      <ProjectDetails project={project} />
    </>
  );
}
