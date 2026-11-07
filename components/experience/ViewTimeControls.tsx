import type { TimeKey, ViewKey } from "@/lib/types/content";
import { SegmentButton } from "@/components/ui/SegmentButton";
import { ExteriorIcon } from "@/components/ui/icons/ExteriorIcon";
import { InteriorIcon } from "@/components/ui/icons/InteriorIcon";
import { MoonIcon } from "@/components/ui/icons/MoonIcon";
import { SunIcon } from "@/components/ui/icons/SunIcon";

interface ViewTimeControlsProps {
  view: ViewKey;
  time: TimeKey;
  onView: (view: ViewKey) => void;
  onTime: (time: TimeKey) => void;
}

/** 04 Experience – bottom glass bar: Exterior | Interior · Day | Night. */
export function ViewTimeControls({ view, time, onView, onTime }: ViewTimeControlsProps) {
  return (
    <div className="[pointer-events:var(--ctrl-pe)] absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/9 bg-[rgba(22,23,26,0.55)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_32px_rgba(201,162,74,0.05),0_20px_60px_rgba(0,0,0,0.4)] backdrop-glass">
      <div className="flex gap-[6px] rounded-full bg-white/3 p-1">
        <SegmentButton selected={view === "exterior"} onClick={() => onView("exterior")} icon={<ExteriorIcon size={34} />}>
          Exterior
        </SegmentButton>
        <SegmentButton selected={view === "interior"} onClick={() => onView("interior")} icon={<InteriorIcon size={34} />}>
          Interior
        </SegmentButton>
      </div>
      <div className="h-14 w-px bg-white/12" />
      <div className="flex gap-[6px] rounded-full bg-white/3 p-1">
        <SegmentButton selected={time === "day"} onClick={() => onTime("day")} icon={<SunIcon size={32} />}>
          Day
        </SegmentButton>
        <SegmentButton selected={time === "night"} onClick={() => onTime("night")} icon={<MoonIcon size={30} />}>
          Night
        </SegmentButton>
      </div>
    </div>
  );
}
