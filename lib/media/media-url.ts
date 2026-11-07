import { LOCAL_MEDIA_PATHS } from "@/content/local-media";

/**
 * Turns a storage path (e.g. "models/atto-3/atto-3-cutout.webp") into a URL.
 *
 * - Files that ship with the app (listed in content/local-media.ts) are served
 *   from /public/media/<path>.
 * - Anything else returns null, so the slot renders a labelled placeholder
 *   showing its storage path. (Stage 2: public Firebase Storage URL.)
 */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (LOCAL_MEDIA_PATHS.has(path)) return `/media/${path}`;
  return null;
}

export type MediaKind = "video" | "image" | "logo" | "iframe";

const KIND_LABEL: Record<MediaKind, string> = {
  video: "VIDEO",
  image: "IMAGE",
  logo: "LOGO",
  iframe: "IFRAME",
};

/** Label shown on a placeholder, in the design's "[KIND: …]" format. */
export function placeholderLabel(kind: MediaKind, path: string): string {
  return `[${KIND_LABEL[kind]}: ${path}]`;
}
