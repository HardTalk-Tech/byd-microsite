import type { MetadataRoute } from "next";
import { shellRoutes } from "@/lib/offline/asset-list";
import { SITE_URL } from "@/lib/site/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return shellRoutes().map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route.startsWith("/experience/") ? 0.8 : 0.6,
  }));
}
