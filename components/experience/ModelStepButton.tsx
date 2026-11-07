import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/ui/icons/ChevronRightIcon";

interface ModelStepButtonProps {
  direction: "prev" | "next";
  /** Name of the model this button goes to. */
  targetName: string;
  onClick: () => void;
}

/** 04 Experience – previous / next model, with the neighbour's name underneath. */
export function ModelStepButton({ direction, targetName, onClick }: ModelStepButtonProps) {
  const isPrev = direction === "prev";
  return (
    <div
      className={`[pointer-events:var(--ctrl-pe)] absolute top-[470px] flex flex-col items-center gap-[14px] ${isPrev ? "left-10" : "right-10"}`}
    >
      <CircleIconButton
        variant="step"
        label={`${isPrev ? "Previous" : "Next"} model: ${targetName}`}
        onClick={onClick}
      >
        {isPrev ? <ChevronLeftIcon size={40} /> : <ChevronRightIcon size={40} />}
      </CircleIconButton>
      <div className="text-[22px] whitespace-nowrap text-ink-2 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
        {targetName}
      </div>
    </div>
  );
}
