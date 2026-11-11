import type { Model } from "@/lib/types/content";
import { rgba } from "@/lib/style/rgba";
import { MediaImage } from "@/components/ui/MediaImage";
import { VehicleName } from "@/components/ui/VehicleName";

interface ModelRailCardProps {
  model: Model;
  selected: boolean;
  onClick: () => void;
}

/** One card in the 03 Models rail. */
export function ModelRailCard({ model, selected, onClick }: ModelRailCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={model.fullName}
      onClick={onClick}
      className="relative flex h-[200px] w-[236px] flex-none flex-col gap-4 rounded-[20px] border border-solid bg-surface-1/60 px-4 pt-[14px] text-ink active:scale-96"
      style={{
        borderColor: selected ? "rgba(201,162,74,0.6)" : "rgba(255,255,255,0.07)",
        boxShadow: selected
          ? `0 0 44px ${rgba(model.accent, 0.55)}, inset 0 0 36px ${rgba(model.accent, 0.22)}`
          : "0 0 0 rgba(0,0,0,0)",
        transition: "box-shadow 700ms ease, border-color 500ms ease, scale 160ms ease",
      }}
    >
      <div className="relative h-[112px] w-[204px]">
        <MediaImage
          path={model.media.thumb}
          alt=""
          width={204}
          tint={model.accent}
          compact
          radius={10}
        />
      </div>
      <div
        className="flex h-[22px] w-full items-center justify-center text-[22px] whitespace-nowrap transition-colors duration-400"
        style={{ fontWeight: selected ? 600 : 400, color: selected ? "#F2F0EB" : "#9A9DA5" }}
      >
        <VehicleName
          model={model}
          textClassName=""
          artworkHeight={14}
          artworkMaxWidth={123}
        />
      </div>
      <div
        className="absolute inset-x-4 bottom-[-1px] h-[3px] rounded-[2px] bg-gold-line shadow-[0_0_14px_rgba(232,200,117,0.7)] transition-opacity duration-400"
        style={{ opacity: selected ? 1 : 0 }}
      />
    </button>
  );
}
