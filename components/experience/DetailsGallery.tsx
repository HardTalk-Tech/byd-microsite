import type { Model } from "@/lib/types/content";
import { MediaImage } from "@/components/ui/MediaImage";

interface DetailsGalleryProps {
  model: Model;
  onOpen: (index: number) => void;
}

/** 04b Details Panel – 4 gallery thumbnails; tap opens 04c Gallery Fullscreen. */
export function DetailsGallery({ model, onOpen }: DetailsGalleryProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {model.media.gallery.map((path, i) => (
        <button
          key={path}
          type="button"
          aria-label={`Open gallery image ${i + 1}`}
          onClick={() => onOpen(i)}
          className="relative h-32 overflow-hidden rounded-[14px] border-0 bg-transparent p-0 transition-[scale,box-shadow] duration-160 active:scale-95 active:shadow-glow-pressed-sm"
        >
          <MediaImage path={path} alt="" width={156} tint={model.accent} compact radius={14} />
        </button>
      ))}
    </div>
  );
}
