/**
 * Home page video links (Firebase Storage, bucket byd-ht-project).
 * Format: MP4 (H.264), played muted and looping.
 *
 * - While a video loads, or if its link fails, a fallback shows instead
 *   (hero: BYD logo on dark; Blade Battery: the battery photo). Links are never
 *   shown to visitors.
 * - An empty link ("") just shows the fallback.
 * - Real links are downloaded for offline use on first launch (lib/offline/asset-list.ts).
 */
export const SITE_VIDEO_LINKS = {
  /** 02 Home – full-screen showreel behind "Drive the Future" (1920 × 1080, 90 s, ~77 MB). */
  heroShowreel:
    "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/hero-byd.mp4?alt=media&token=5f433894-0713-49d4-bdaa-d09f0773ad50",
  /** 02 Home – full-screen Blade Battery section background (1280 × 720, 115 s, ~48 MB). */
  bladeBattery:
    "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/Blade-Battery.mp4?alt=media&token=32151ead-9e20-46ca-b821-ca615e60f93c",
} as const;

export type SiteVideoKey = keyof typeof SITE_VIDEO_LINKS;
