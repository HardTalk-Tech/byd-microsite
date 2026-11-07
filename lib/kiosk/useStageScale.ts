"use client";

import { useSyncExternalStore } from "react";

/** The design canvas. Everything is laid out in these pixels. */
export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function getSnapshot() {
  return Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT);
}

function getServerSnapshot() {
  return 1;
}

/** Scale that fits the 1920 × 1080 canvas into the window (1 on the kiosk screen). */
export function useStageScale(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
