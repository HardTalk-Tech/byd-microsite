import type { Model } from "@/lib/types/content";
import { AccentDot } from "@/components/ui/AccentDot";
import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { ArrowLeftIcon } from "@/components/ui/icons/ArrowLeftIcon";
import { VehicleName } from "@/components/ui/VehicleName";

interface ExperienceModelBadgeProps {
  model: Model;
  onBack: () => void;
}

/** 04 Experience – top-left glass pill: back button, model name and colour. */
export function ExperienceModelBadge({ model, onBack }: ExperienceModelBadgeProps) {
  return (
    <div className="[pointer-events:var(--ctrl-pe)] absolute left-12 top-[150px] flex items-center gap-6 rounded-full border border-white/9 bg-[rgba(22,23,26,0.55)] py-3 pr-9 pl-3 shadow-glass backdrop-glass">
      <CircleIconButton variant="back" label="Back to models" onClick={onBack}>
        <ArrowLeftIcon size={30} />
      </CircleIconButton>
      <div className="flex flex-col gap-[6px]">
        <VehicleName
          model={model}
          textClassName="font-display text-[40px] leading-none whitespace-nowrap"
          artworkHeight={28}
          artworkMaxWidth={245}
        />
        <div className="flex items-center gap-[10px] text-[22px] text-ink-2">
          <AccentDot colour={model.accent} size={14} />
          {model.colourName}
        </div>
      </div>
    </div>
  );
}
