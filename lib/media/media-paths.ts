import type { ClipKey, ModelMedia } from "@/lib/types/content";

/** Number of gallery images per model in the design. */
export const GALLERY_SIZE = 4;

/** Builds the storage paths for one model, following the Stage 2 storage layout. */
export function modelMediaPaths(slug: string): ModelMedia {
  const base = `models/${slug}/${slug}`;
  const clip = (key: ClipKey, ext: "mp4" | "webp") => `${base}-${key}.${ext}`;

  return {
    cutout: `${base}-cutout.webp`,
    thumb: `${base}-thumb.webp`,
    videos: {
      "exterior-day": clip("exterior-day", "mp4"),
      "exterior-night": clip("exterior-night", "mp4"),
      "interior-day": clip("interior-day", "mp4"),
      "interior-night": clip("interior-night", "mp4"),
    },
    posters: {
      "exterior-day": clip("exterior-day", "webp"),
      "exterior-night": clip("exterior-night", "webp"),
      "interior-day": clip("interior-day", "webp"),
      "interior-night": clip("interior-night", "webp"),
    },
    gallery: Array.from({ length: GALLERY_SIZE }, (_, i) => `${base}-gallery-${i + 1}.webp`),
  };
}
