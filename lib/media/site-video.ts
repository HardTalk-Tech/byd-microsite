import { SITE_VIDEO_LINKS } from "@/content/site-videos";
import type { SiteVideoKey } from "@/content/site-videos";

/** URL of a Home page video, or null when its link is empty. */
export function siteVideoUrl(key: SiteVideoKey): string | null {
  const link: string = SITE_VIDEO_LINKS[key];
  return link.trim() || null;
}
