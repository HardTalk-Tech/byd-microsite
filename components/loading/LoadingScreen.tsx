"use client";

import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SweepShine } from "@/components/ui/SweepShine";
import { LoadingProgressRing } from "./LoadingProgressRing";

/** 01 Loading – shown on app start, fades out over the first screen. */
export function LoadingScreen() {
  const { state } = useKiosk();
  const { loading, loadedCount, loadTotal } = state;
  const progress = loadTotal > 0 ? Math.min(1, loadedCount / loadTotal) : 0;

  return (
    <div
      data-screen-label="01 Loading"
      aria-hidden={!loading}
      className="absolute inset-0 transition-opacity duration-900"
      style={{
        opacity: loading ? 1 : 0,
        pointerEvents: loading ? "auto" : "none",
        background: "radial-gradient(ellipse at 50% 46%, #16171A 0%, #0A0A0B 62%)",
      }}
    >
      <GridBackdrop lineAlpha={0.03} mask="ellipse at 50% 50%, #000 10%, transparent 70%" />
      <SweepShine variant="slow" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-14">
        <BrandLogo width={240} height={76} priority />
        <LoadingProgressRing progress={progress} />
        <div className="flex flex-col items-center gap-4">
          <div className="text-[38px] font-light tracking-[0.02em] text-ink">Preparing showroom experience</div>
          <div className="text-[22px] tracking-[0.06em] text-ink-4">
            {loadTotal > 0 ? `${Math.min(loadedCount, loadTotal)} of ${loadTotal} videos ready` : "Getting everything ready"}
          </div>
        </div>
      </div>
    </div>
  );
}
