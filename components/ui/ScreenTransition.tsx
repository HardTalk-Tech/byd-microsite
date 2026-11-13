"use client";

import { ViewTransition } from "react";
import type { ReactNode } from "react";

interface ScreenTransitionProps {
  /** Crossfade duration the design gives this screen. */
  duration: 700 | 800 | 900;
  children: ReactNode;
}

/**
 * Crossfades a route-level screen in and out (React <ViewTransition>).
 * Model changes inside 04 Experience use the "model-step" type and skip the
 * crossfade, because they dip to black instead.
 *
 * The screen sits in a full-size box that clips its own content: the crossfade
 * snapshot is drawn above the page and ignores the stage's clipping, so without
 * this, anything parked off-screen (e.g. the closed 04b Details Panel) would flash
 * in the side bars during the fade.
 */
export function ScreenTransition({ duration, children }: ScreenTransitionProps) {
  const className = `screen-${duration}`;
  return (
    <ViewTransition
      enter={{ "model-step": "none", default: className }}
      exit={{ "model-step": "none", default: className }}
      default="none"
    >
      <div className="absolute inset-0 overflow-hidden">{children}</div>
    </ViewTransition>
  );
}
