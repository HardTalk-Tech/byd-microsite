"use client";

import type { ReactNode } from "react";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { STAGE_HEIGHT, STAGE_WIDTH } from "@/lib/kiosk/useStageScale";

/**
 * The 1920 × 1080 design canvas ("Kiosk" in the design), scaled to fit the
 * window and letterboxed on black. Any touch counts as activity.
 */
export function KioskStage({ children }: { children: ReactNode }) {
  const { scale, actions } = useKiosk();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-black font-sans">
      <div
        className="relative flex-none"
        style={{ width: Math.round(STAGE_WIDTH * scale), height: Math.round(STAGE_HEIGHT * scale) }}
      >
        <div
          data-screen-label="Kiosk"
          onPointerDownCapture={actions.touch}
          className="absolute left-0 top-0 origin-top-left touch-manipulation overflow-hidden bg-kiosk-bg text-ink select-none"
          style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
