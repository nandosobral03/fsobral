export function toContentSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const toProjectSlug = toContentSlug;

export function contentPath(basePath: string, slug: string) {
  return `${basePath.replace(/\/$/, "")}/${slug}`;
}

export function decodeRouteParam(param: string) {
  return decodeURIComponent(param);
}
