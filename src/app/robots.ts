import type { MetadataRoute } from "next";

const getBaseUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${base}/sitemap.xml`],
  };
}
