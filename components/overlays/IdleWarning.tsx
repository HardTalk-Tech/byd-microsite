"use client";

import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { KIOSK_TIMINGS } from "@/lib/kiosk/timings";
import { GoldButton } from "@/components/ui/GoldButton";

/** "Still there?" countdown shown for the last seconds before the idle reset. */
export function IdleWarning() {
  const { state, actions } = useKiosk();
  const visible = state.idleSecondsLeft !== null;

  return (
    <div
      role="status"
      inert={!visible}
      className="absolute left-1/2 top-36 flex items-center gap-7 rounded-full border border-[rgba(201,162,74,0.45)] bg-[rgba(22,23,26,0.82)] py-[14px] pr-[14px] pl-9 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(201,162,74,0.06)] backdrop-blur-[24px]"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: `translateX(-50%) translateY(${visible ? 0 : -24}px)`,
        transition: "opacity 500ms ease, transform 500ms ease",
      }}
    >
      <div className="flex flex-col gap-[2px]">
        <div className="text-[28px] font-medium">Still there?</div>
        <div className="text-[22px] text-ink-4">
          Returning to start in {state.idleSecondsLeft ?? KIOSK_TIMINGS.idleWarningSeconds} s
        </div>
      </div>
      <GoldButton
        shine={false}
        onClick={actions.dismissIdle}
        className="h-[72px] px-[34px] text-[22px] tracking-[0.14em]"
        style={{ boxShadow: "none" }}
      >
        I&apos;m here
      </GoldButton>
    </div>
  );
}
