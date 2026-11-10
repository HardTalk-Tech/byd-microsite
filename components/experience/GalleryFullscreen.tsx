import type { Model } from "@/lib/types/content";
import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/ui/icons/ChevronRightIcon";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { MediaImage } from "@/components/ui/MediaImage";

interface GalleryFullscreenProps {
  model: Model;
  /** Image shown, or null when closed. */
  index: number | null;
  onStep: (delta: number) => void;
  onClose: () => void;
}

/** 04c Gallery Fullscreen – large gallery image with prev / next and close. */
export function GalleryFullscreen({ model, index, onStep, onClose }: GalleryFullscreenProps) {
  const open = index !== null;
  const shown = index ?? 0;
  const total = model.media.gallery.length;

  return (
    <div
      data-screen-label="04c Gallery Fullscreen"
      inert={!open}
      className="absolute inset-0 bg-[rgba(6,6,7,0.94)] backdrop-blur-[12px] transition-opacity duration-500"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
    >
      <div className="absolute inset-x-[180px] top-[110px] bottom-[150px] overflow-hidden rounded-3xl">
        <MediaImage
          path={model.media.gallery[shown]}
          alt={`${model.fullName} gallery image ${shown + 1}`}
          width={1560}
          tint={model.accent}
          radius={24}
        />
      </div>
      <CircleIconButton variant="gallery" label="Previous image" onClick={() => onStep(-1)} className="absolute left-10 top-[calc(488px+var(--stage-shift))]">
        <ChevronLeftIcon size={40} />
      </CircleIconButton>
      <CircleIconButton variant="gallery" label="Next image" onClick={() => onStep(1)} className="absolute right-10 top-[calc(488px+var(--stage-shift))]">
        <ChevronRightIcon size={40} />
      </CircleIconButton>
      <div className="absolute inset-x-0 bottom-14 flex justify-center text-[22px] tracking-[0.24em] text-ink-2">
        {shown + 1} / {total}
      </div>
      <CircleIconButton variant="close" label="Close gallery" onClick={onClose} className="absolute right-12 top-6">
        <CloseIcon size={28} />
      </CircleIconButton>
    </div>
  );
}
