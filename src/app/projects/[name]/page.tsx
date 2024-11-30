import NotFound from "@/components/sections/NotFound";
import ProjectDetails from "@/app/projects/project-details";
import { projects } from "@/app/projects/projects";

export default async function ProjectPage({ params }: { params: { name: string } }) {
  // Replace URL-encoded spaces with regular spaces before comparing
  const decodedName = decodeURIComponent(params.name);
  const project = projects.find((project) => project.name === decodedName);

  if (!project) {
    return <NotFound type="project" />;
  }

  return <ProjectDetails project={project} />;
}
