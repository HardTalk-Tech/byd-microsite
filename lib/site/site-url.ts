/** Public address of the site (link previews, sitemap). Set NEXT_PUBLIC_SITE_URL per deployment. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://byd-microsite.vercel.app").replace(/\/+$/, "");

export const SITE_NAME = "BYD Showroom Sri Lanka";
export const SITE_DESCRIPTION =
  "Explore the BYD range in Sri Lanka – every model, inside and out, day and night – and find your nearest BYD showroom.";
