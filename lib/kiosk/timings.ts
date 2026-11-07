/**
 * Kiosk timings and gesture thresholds.
 * Values marked "design" come from the design's JavaScript; the rest were
 * chosen for this build and are listed in the stage summary.
 */
export const KIOSK_TIMINGS = {
  /** design: idle / auto-hide tick */
  tickMs: 250,
  /** design: "Still there?" shows for the last 10 s */
  idleWarningSeconds: 10,
  /** design: idle timeout is never shorter than 15 s */
  minIdleTimeoutSeconds: 15,
  /** design: Experience controls hide after 6 s without touch */
  controlsAutoHideMs: 6000,
  /** design: taps within 350 ms of revealing controls are ignored */
  revealGuardMs: 350,
  /** design: model switches 380 ms into the dip to black */
  dipSwitchMs: 380,
  /** design: dip releases 80 ms after the switch (460 ms total) */
  dipReleaseMs: 80,
  /** design: simulated loading step */
  loadingStepMs: 150,
  /** design: pause at 100 % before leaving 01 Loading */
  loadingDoneDelayMs: 1200,
  /** design: Home counts as "scrolled" (idle timer active) past 40 px */
  homeScrolledPx: 40,
} as const;

export const SWIPE = {
  /** design: Models swipe distance */
  modelsMinPx: 90,
  /** design: Experience swipe distance */
  experienceMinPx: 120,
  /** design: movement below 12 px is a tap */
  tapMaxPx: 12,
  /** chosen: a swipe must be within 30° of horizontal */
  maxAngleDeg: 30,
} as const;
