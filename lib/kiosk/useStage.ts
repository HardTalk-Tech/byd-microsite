"use client";

import { useSyncExternalStore } from "react";
import { DESIGN_HEIGHT, stageFor } from "./stage-math";

export { DESIGN_HEIGHT, MAX_STAGE_HEIGHT, MIN_STAGE_HEIGHT, STAGE_WIDTH } from "./stage-math";

export interface Stage {
  /** Screen px per design px. */
  scale: number;
  /** Canvas height in design px (1080–1280). */
  height: number;
  /**
   * False during server rendering and hydration: the canvas then takes its size
   * from the CSS variables set by STAGE_BOOT_SCRIPT (see KioskStage).
   */
  measured: boolean;
}

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

// Snapshot must be a primitive so React can compare it.
function getSnapshot(): string {
  const { scale, height } = stageFor(window.innerWidth, window.innerHeight);
  return `${scale}|${height}`;
}

function getServerSnapshot(): string {
  return "";
}

/** Scale and height of the canvas for the current window. */
export function useStage(): Stage {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!snap) return { scale: 1, height: DESIGN_HEIGHT, measured: false };
  const [scale, height] = snap.split("|").map(Number);
  return { scale, height, measured: true };
}
