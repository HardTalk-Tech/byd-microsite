"use client";

import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoldButton } from "@/components/ui/GoldButton";
import { GridBackdrop } from "@/components/ui/GridBackdrop";

/** Unknown route. Not in the design – built in its style. */
export default function NotFound() {
  const { actions } = useKiosk();

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-10"
      style={{ background: "radial-gradient(ellipse at 50% 46%, #16171A 0%, #0A0A0B 62%)" }}
    >
      <GridBackdrop lineAlpha={0.03} mask="ellipse at 50% 50%, #000 10%, transparent 70%" />
      <Eyebrow className="relative">Page not found</Eyebrow>
      <h1 className="relative font-display text-[64px] leading-none">This page is not available</h1>
      <GoldButton
        arrow
        onClick={() => actions.goTo("home")}
        className="relative h-[88px] gap-[18px] px-12 text-[24px] tracking-[0.2em]"
      >
        Back to Home
      </GoldButton>
    </div>
  );
}
