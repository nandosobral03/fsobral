import { getProjectByRouteParam } from "../projects";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const awaited = await params;
  const name = decodeURIComponent(awaited.name);
  const project = getProjectByRouteParam(name);

  return renderOgImage({
    title: project?.name ?? name,
    subtitle: project?.preview.description ?? "",
  });
}
