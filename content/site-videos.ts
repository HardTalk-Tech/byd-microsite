/**
 * Home page video links.
 *
 * ⚠ DUMMY LINKS – replace each with the real video URL (e.g. a Firebase Storage
 *   download link). Format: MP4 (H.264), 1920 × 1080, ~10–20 s loop, muted.
 *
 * - While a video loads, or if its link fails, a fallback shows instead
 *   (hero: BYD logo on dark; Blade Battery: the battery photo). Links are never
 *   shown to visitors.
 * - An empty link ("") just shows the fallback.
 */
export const SITE_VIDEO_LINKS = {
  /** 02 Home – full-screen showreel behind "Drive the Future". */
  heroShowreel: "https://example.com/byd-kiosk/videos/home/hero-showreel.mp4",
  /** 02 Home – Blade Battery section background video. */
  bladeBattery: "https://example.com/byd-kiosk/videos/home/blade-battery.mp4",
} as const;

export type SiteVideoKey = keyof typeof SITE_VIDEO_LINKS;
