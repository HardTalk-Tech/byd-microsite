import type { ReactNode } from "react";

/**
 * A 1920 × 1080 box, vertically centred in the canvas. Screens put their
 * top-anchored design layout inside it, so on taller screens (16:10, the
 * 1.72:1 kiosk) the content stays centred while edge-anchored parts
 * (rail, bottom bars) sit outside it at the real edges.
 *
 * Render edge-anchored parts AFTER the frame so they stay on top of it.
 */
export function DesignFrame({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-x-0 h-[1080px]" style={{ top: "var(--stage-shift)" }}>
      {children}
    </div>
  );
}
