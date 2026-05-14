import type { MetadataRoute } from "next";
import { getLocalBaseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getLocalBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${base}/sitemap.xml`],
  };
}
