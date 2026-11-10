"use client";

import type { CSSProperties } from "react";
import type { MediaKind } from "@/lib/media/media-url";
import { useMediaDebug } from "@/lib/media/useMediaDebug";
import { cn } from "@/lib/style/cn";

interface MediaPlaceholderProps {
  kind: MediaKind;
  /** Developer label – the storage path or link in "[KIND: …]" form. Only shown with ?debug=1. */
  label: string;
  tint?: string;
  /** Smaller label for thumbnails. */
  compact?: boolean;
  /** Lighter base for transparent cut-outs. */
  transparent?: boolean;
  radius?: number;
  frameInset?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Stand-in for media that isn't available.
 * Visitors see a clean dark tile with a soft glow in the model's colour.
 * With ?debug=1 it shows the design's labelled placeholder (dashed frame + path),
 * so it's easy to see which file belongs where.
 */
export function MediaPlaceholder({
  kind,
  label,
  tint = "#C9A24A",
  compact = false,
  transparent = false,
  radius = 0,
  frameInset = 0,
  className,
  style,
}: MediaPlaceholderProps) {
  const debug = useMediaDebug();
  const n = parseInt(tint.slice(1), 16);
  const rgb = `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  const labelSize = compact ? 13 : kind === "logo" ? 18 : 20;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background: transparent ? "rgba(20,21,24,0.25)" : "#121316",
        borderRadius: radius,
        ...style,
      }}
      data-media-kind={kind}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 55%, rgba(${rgb},${transparent ? 0.12 : 0.22}) 0%, transparent 68%)`,
        }}
      />
      {debug && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 2px, transparent 2px, transparent 16px)",
            }}
          />
          <div
            className="pointer-events-none absolute border-[1.5px] border-dashed border-[rgba(201,162,74,0.55)]"
            style={{ inset: frameInset, borderRadius: radius }}
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-3"
            style={{ gap: compact ? 6 : 16 }}
          >
            {kind === "video" && (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-[rgba(232,200,117,0.8)] bg-[rgba(10,10,11,0.45)]">
                <div className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-gold-light" />
              </div>
            )}
            <div
              className="max-w-[92%] rounded-md bg-[rgba(10,10,11,0.6)] text-center font-mono leading-[1.35] tracking-[0.02em] break-all text-gold-label"
              style={{ fontSize: labelSize, padding: compact ? "3px 7px" : "8px 14px" }}
            >
              {label}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
