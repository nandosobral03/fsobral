import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { projectOgMetadata } from "../project-og-metadata";

export const runtime = "edge";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const awaited = await params;
  const name = decodeURIComponent(awaited.name);
  const project = projectOgMetadata.find((p) => p.name === name);

  return renderOgImage({
    title: project?.name ?? name,
    subtitle: project?.description ?? "",
  });
}
