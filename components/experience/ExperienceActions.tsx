import { GlassButton } from "@/components/ui/GlassButton";
import { GoldButton } from "@/components/ui/GoldButton";
import { DetailsIcon } from "@/components/ui/icons/DetailsIcon";

interface ExperienceActionsProps {
  onDetails: () => void;
  onBookTestDrive: () => void;
}

/** 04 Experience – bottom-right: Details and Book Test Drive. */
export function ExperienceActions({ onDetails, onBookTestDrive }: ExperienceActionsProps) {
  return (
    <div className="[pointer-events:var(--ctrl-pe)] absolute right-12 bottom-12 flex w-[340px] flex-col gap-[14px]">
      <GlassButton
        onClick={onDetails}
        className="h-20 gap-[14px] border-white/16 bg-[rgba(22,23,26,0.55)] text-[22px] tracking-[0.2em] backdrop-blur-[24px]"
      >
        <DetailsIcon size={26} />
        Details
      </GlassButton>
      <GoldButton
        onClick={onBookTestDrive}
        className="h-[88px] text-[22px] tracking-[0.18em]"
        style={{ boxShadow: "0 0 0 1px rgba(232,200,117,0.5), 0 12px 44px rgba(201,162,74,0.4)" }}
      >
        Book Test Drive
      </GoldButton>
    </div>
  );
}
