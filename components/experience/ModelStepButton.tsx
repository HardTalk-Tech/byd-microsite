import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/ui/icons/ChevronRightIcon";
import type { Model } from "@/lib/types/content";
import { VehicleName } from "@/components/ui/VehicleName";

interface ModelStepButtonProps {
  direction: "prev" | "next";
  /** Model this button goes to. */
  targetModel: Model;
  onClick: () => void;
}

/** 04 Experience – previous / next model, with the neighbour's name underneath. */
export function ModelStepButton({ direction, targetModel, onClick }: ModelStepButtonProps) {
  const isPrev = direction === "prev";
  return (
    <div
      className={`[pointer-events:var(--ctrl-pe)] absolute top-[calc(470px+var(--stage-shift))] flex flex-col items-center gap-[14px] ${isPrev ? "left-10" : "right-10"}`}
    >
      <CircleIconButton
        variant="step"
        label={`${isPrev ? "Previous" : "Next"} model: ${targetModel.fullName}`}
        onClick={onClick}
      >
        {isPrev ? <ChevronLeftIcon size={40} /> : <ChevronRightIcon size={40} />}
      </CircleIconButton>
      <div className="text-[22px] whitespace-nowrap text-ink-2 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
        <VehicleName
          model={targetModel}
          textClassName=""
          artworkHeight={14}
          artworkMaxWidth={123}
        />
      </div>
    </div>
  );
}
