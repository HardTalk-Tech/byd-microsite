"use client";

import type { CSSProperties, ReactNode } from "react";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { DESIGN_HEIGHT, STAGE_WIDTH } from "@/lib/kiosk/useStage";

/**
 * The design canvas ("Kiosk" in the design): 1920 design px wide, 1080–1280 tall
 * depending on the screen's shape, scaled to the window. Any touch counts as activity.
 *
 * CSS variables for layouts:
 *   --stage-h      canvas height (px)
 *   --stage-shift  half the extra height over the 1080 design – used to keep
 *                  top-anchored content vertically centred (see DesignFrame)
 */
export function KioskStage({ children }: { children: ReactNode }) {
  const { scale, stageHeight, stageMeasured, actions } = useKiosk();

  // Before the client has measured the window (server render, hydration) the size comes
  // from --k-scale / --k-h, set by the inline boot script in app/layout.tsx – the same
  // numbers, so nothing moves when React takes over.
  const k = stageMeasured ? String(scale) : "var(--k-scale, 1)";
  const h = stageMeasured ? `${stageHeight}px` : `var(--k-h, ${DESIGN_HEIGHT}px)`;

  const canvasStyle = {
    width: STAGE_WIDTH,
    height: h,
    transform: `scale(${k})`,
    "--stage-h": h,
    "--stage-shift": `calc((${h} - ${DESIGN_HEIGHT}px) / 2)`,
  } as CSSProperties;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-black font-sans">
      <div
        className="relative flex-none"
        style={{ width: `calc(${STAGE_WIDTH}px * ${k})`, height: `calc(${h} * ${k})` }}
      >
        <div
          data-screen-label="Kiosk"
          onPointerDownCapture={actions.touch}
          className="absolute left-0 top-0 origin-top-left touch-manipulation overflow-hidden bg-kiosk-bg text-ink select-none"
          style={canvasStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
