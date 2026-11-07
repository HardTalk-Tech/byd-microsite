import { mediaUrl, placeholderLabel } from "@/lib/media/media-url";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface MediaVideoProps {
  /** Storage path of the video. */
  path: string;
  /** Storage path of the poster image. */
  posterPath?: string;
  tint?: string;
  radius?: number;
  className?: string;
}

/**
 * Looping, muted background video from storage. Fills its (positioned) parent.
 * Renders a labelled placeholder while mediaUrl() has no URL (Stage 1).
 */
export function MediaVideo({ path, posterPath, tint, radius = 0, className }: MediaVideoProps) {
  const url = mediaUrl(path);

  if (!url) {
    return (
      <MediaPlaceholder
        kind="video"
        label={placeholderLabel("video", path)}
        tint={tint}
        radius={radius}
        className={className}
      />
    );
  }

  return (
    <video
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: radius }}
      src={url}
      poster={mediaUrl(posterPath) ?? undefined}
      muted
      playsInline
      loop
      autoPlay
      preload="auto"
    />
  );
}
