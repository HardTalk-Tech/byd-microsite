"use client";

import { mediaUrl } from "@/lib/media/media-url";
import { useMediaDebug } from "@/lib/media/useMediaDebug";
import { rgba } from "@/lib/style/rgba";
import type { Model } from "@/lib/types/content";
import { BrandLogo } from "./BrandLogo";
import { MediaImage } from "./MediaImage";
import { SweepShine } from "./SweepShine";

interface VideoBackdropProps {
  /** Car: the model's cut-out on its accent glow. Logo: the BYD logo (Home hero). */
  variant: "car" | "logo";
  model?: Model;
  /** Developer label (the link or path), only shown with ?debug=1. */
  label: string;
}

/**
 * Shown under every video: visible while it loads, and if it's missing or fails.
 * Never shows link text to visitors (the label appears only with ?debug=1).
 */
export function VideoBackdrop({ variant, model, label }: VideoBackdropProps) {
  const debug = useMediaDebug();
  const accent = model?.accent ?? "#C9A24A";
  const cutout = model ? mediaUrl(model.media.cutout) : null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-kiosk-bg" data-media-kind="video">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 45% 45% at 50% 55%, ${rgba(accent, 0.42)} 0%, ${rgba(accent, 0.12)} 45%, transparent 75%)`,
        }}
      />
      {variant === "car" && model && cutout && (
        <div className="absolute left-1/2 top-1/2 h-[430px] w-[1020px] -translate-x-1/2 -translate-y-1/2">
          <MediaImage
            path={model.media.cutout}
            alt={`${model.fullName}`}
            width={1020}
            tint={model.accent}
            transparent
            fit="contain"
          />
        </div>
      )}
      {variant === "logo" && (
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 opacity-80">
          <BrandLogo width={420} height={132} />
        </div>
      )}
      <SweepShine variant="slow" />
      {debug && (
        <div data-debug-label className="absolute bottom-6 left-6 max-w-[70%] rounded-md bg-[rgba(10,10,11,0.7)] px-3 py-2 font-mono text-[16px] break-all text-gold-label">
          {label}
        </div>
      )}
    </div>
  );
}
