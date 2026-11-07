"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import { SWIPE } from "@/lib/kiosk/timings";

export type SwipeDirection = "left" | "right";

interface UseSwipeOptions {
  /** Canvas scale, so distances are measured in design pixels. */
  scale: number;
  /** Minimum horizontal distance for a swipe (design px). */
  minDistance: number;
  onSwipe: (direction: SwipeDirection) => void;
  /** Called when the pointer moved less than the tap threshold. */
  onTap?: () => void;
}

/**
 * Pointer Events swipe / tap detection.
 * - Movement under SWIPE.tapMaxPx → tap.
 * - Horizontal movement ≥ minDistance and within SWIPE.maxAngleDeg of horizontal → swipe.
 * - Anything else (short drags, vertical drags) → nothing.
 */
export function useSwipe({ scale, minDistance, onSwipe, onTap }: UseSwipeOptions) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const maxSlope = Math.tan((SWIPE.maxAngleDeg * Math.PI) / 180);

  return {
    onPointerDown(e: PointerEvent<HTMLElement>) {
      start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
      // Keep receiving the pointer even if the finger leaves the area.
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    onPointerUp(e: PointerEvent<HTMLElement>) {
      const s = start.current;
      start.current = null;
      if (!s || s.id !== e.pointerId) return;

      const dx = (e.clientX - s.x) / scale;
      const dy = (e.clientY - s.y) / scale;

      if (Math.hypot(dx, dy) < SWIPE.tapMaxPx) {
        onTap?.();
        return;
      }
      const isHorizontal = Math.abs(dy) <= Math.abs(dx) * maxSlope;
      if (isHorizontal && Math.abs(dx) >= minDistance) {
        onSwipe(dx < 0 ? "left" : "right");
      }
    },
    onPointerCancel() {
      start.current = null;
    },
  };
}
