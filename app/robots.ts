import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/offline-manifest.json"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
