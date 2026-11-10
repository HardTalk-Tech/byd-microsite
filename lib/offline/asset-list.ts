import { LOCAL_MEDIA_PATHS } from "@/content/local-media";
import { MODEL_VIDEO_LINKS } from "@/content/model-videos";
import { MODELS } from "@/content/models";
import { SITE_VIDEO_LINKS } from "@/content/site-videos";

/** Placeholder links (example.com) are skipped – they will never load. */
export function isRealLink(url: string | null | undefined): url is string {
  if (!url || !url.trim()) return false;
  try {
    const host = new URL(url).hostname;
    return host !== "example.com" && !host.endsWith(".example.com");
  } catch {
    return false;
  }
}

/** Every remote media URL the kiosk plays (Experience clips + Home videos), dummies skipped. */
export function mediaDownloadList(): string[] {
  const links = [
    ...Object.values(MODEL_VIDEO_LINKS).flatMap((clips) => Object.values(clips)),
    ...Object.values(SITE_VIDEO_LINKS),
  ];
  return [...new Set(links.filter(isRealLink).map((l) => l.trim()))];
}

/** How many media links are still dummies / empty (kept in the offline status). */
export function placeholderLinkCount(): number {
  const links = [
    ...Object.values(MODEL_VIDEO_LINKS).flatMap((clips) => Object.values(clips)),
    ...Object.values(SITE_VIDEO_LINKS),
  ];
  return links.filter((l) => !isRealLink(l)).length;
}

/** Every page route, built from the route structure and the model data. */
export function shellRoutes(): string[] {
  return ["/", "/models", "/showrooms", ...MODELS.map((m) => `/experience/${m.slug}`)];
}

/** Same-origin static files the app needs offline (besides /_next/static, cached on use). */
export function localAssets(): string[] {
  return [
    ...[...LOCAL_MEDIA_PATHS].map((p) => `/media/${p}`),
    "/brand/byd-logo-white.png",
    "/brand/byd-logo-black.png",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/icons/icon-512-maskable.png",
    "/icons/apple-touch-icon.png",
    "/manifest.webmanifest",
  ];
}
