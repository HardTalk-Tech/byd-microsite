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
 */
export function ScreenTransition({ duration, children }: ScreenTransitionProps) {
  const className = `screen-${duration}`;
  return (
    <ViewTransition
      enter={{ "model-step": "none", default: className }}
      exit={{ "model-step": "none", default: className }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
