import DetailRouteFrame from "@/components/common/detail-route-frame";
import NotFound from "@/components/sections/NotFound";
import ProjectDetails from "@/app/projects/project-details";
import { projects } from "@/content";
import { normalizeInterceptedRouteParam } from "@/lib/intercepted-route-param";

export default async function ProjectDetailModalPage({
  params,
}: {
  params: Promise<{ name?: string | string[] }>;
}) {
  const resolvedParams = await params;
  const name = normalizeInterceptedRouteParam(resolvedParams.name);
  const project = projects.fromRouteParam(name);

  if (!project) {
    return (
      <DetailRouteFrame label="404">
        <NotFound type="project" />
      </DetailRouteFrame>
    );
  }

  return (
    <DetailRouteFrame label={project.name}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projects.jsonLd(project)) }} />
      <ProjectDetails project={project} />
    </DetailRouteFrame>
  );
}
