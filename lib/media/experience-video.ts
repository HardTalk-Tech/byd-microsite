import { MODEL_VIDEO_LINKS } from "@/content/model-videos";
import { mediaUrl } from "@/lib/media/media-url";
import type { ClipKey, Model } from "@/lib/types/content";

export interface ExperienceVideo {
  /** URL to play, or null to show the placeholder. */
  url: string | null;
  /** What the placeholder label shows: the link, or the storage path. */
  source: string;
}

/**
 * The video for one 04 Experience clip.
 * Uses the link from content/model-videos.ts; an empty link falls back to the
 * model's storage path via mediaUrl() (Firebase, Stage 2).
 */
export function experienceVideo(model: Model, clip: ClipKey): ExperienceVideo {
  const link = MODEL_VIDEO_LINKS[model.slug]?.[clip]?.trim();
  if (link) return { url: link, source: link };
  const path = model.media.videos[clip];
  return { url: mediaUrl(path), source: path };
}
