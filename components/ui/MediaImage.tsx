import Image from "next/image";
import type { CSSProperties } from "react";
import { mediaUrl, placeholderLabel } from "@/lib/media/media-url";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface MediaImageProps {
  /** Storage path, e.g. "models/atto-3/atto-3-cutout.webp". */
  path: string;
  alt: string;
  kind?: "image" | "logo";
  /** Rendered size in design px (used for `sizes`). */
  width: number;
  tint?: string;
  compact?: boolean;
  transparent?: boolean;
  radius?: number;
  fit?: "cover" | "contain";
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Image from storage. Fills its (positioned) parent.
 * Renders a labelled placeholder while mediaUrl() has no URL (Stage 1).
 */
export function MediaImage({
  path,
  alt,
  kind = "image",
  width,
  tint,
  compact,
  transparent,
  radius = 0,
  fit = "cover",
  priority,
  className,
  style,
}: MediaImageProps) {
  const url = mediaUrl(path);

  if (!url) {
    return (
      <MediaPlaceholder
        kind={kind}
        label={placeholderLabel(kind, path)}
        tint={tint}
        compact={compact}
        transparent={transparent}
        radius={radius}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      sizes={`${width}px`}
      className={className}
      style={{ objectFit: fit, borderRadius: radius, ...style }}
    />
  );
}
