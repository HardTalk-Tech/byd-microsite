"use client";

import { useEffect } from "react";
import { MODELS } from "@/content/models";
import { SHOWROOMS } from "@/content/showrooms";
import { useKiosk, type KioskActions } from "@/lib/kiosk/KioskProvider";
import type { TimeKey, ViewKey } from "@/lib/types/content";

const STEP_MS = 4000;
const VIEWS: ViewKey[] = ["exterior", "interior"];
const TIMES: TimeKey[] = ["day", "night"];

/** One loop of the tour: Home → Models (every model) → Experience (every view/time) → Showrooms. */
function tourSteps(a: KioskActions): (() => void)[] {
  const steps: (() => void)[] = [() => a.goTo("home"), () => a.goTo("models")];
  MODELS.forEach((_, i) => steps.push(() => a.selectModel(i)));
  MODELS.forEach((_, i) => {
    steps.push(() => a.selectModel(i), () => a.goTo("experience"));
    for (const view of VIEWS) for (const time of TIMES) steps.push(() => (a.setView(view), a.setTime(time)));
  });
  steps.push(() => a.goTo("showrooms"));
  SHOWROOMS.forEach((_, i) => steps.push(() => a.selectShowroom(i)));
  return steps;
}

/**
 * Test aid (Stage 5): `?autotour=1` drives the kiosk around every screen forever,
 * for memory soak tests. Does nothing without the parameter.
 */
export function AutoTour() {
  const { state, actions } = useKiosk();
  const ready = !state.loading;

  useEffect(() => {
    if (!ready || new URLSearchParams(location.search).get("autotour") !== "1") return;
    const steps = tourSteps(actions);
    let i = 0;
    const id = setInterval(() => {
      actions.touch(); // keep the idle reset away
      steps[i % steps.length]();
      i++;
    }, STEP_MS);
    return () => clearInterval(id);
  }, [ready, actions]);

  return null;
}
