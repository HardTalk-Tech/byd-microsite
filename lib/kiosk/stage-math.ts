/**
 * The design canvas. Width is always 1920 design px; the height follows the
 * screen's shape so any landscape screen is filled without black bars:
 *   16:9  → 1080 (the design)      kiosk 1.72:1 → ~1116
 *   16:10 → 1200                   3:2          → 1280
 * Outside that range (ultrawide, near-square) the canvas fits inside the
 * screen with thin bars; nothing is ever cropped.
 */
export const STAGE_WIDTH = 1920;
/** Height the design was drawn at; layouts keep this look and share out any extra height. */
export const DESIGN_HEIGHT = 1080;
export const MIN_STAGE_HEIGHT = 1080;
export const MAX_STAGE_HEIGHT = 1280;

export function stageFor(vw: number, vh: number): { scale: number; height: number } {
  const height = Math.round(Math.min(MAX_STAGE_HEIGHT, Math.max(MIN_STAGE_HEIGHT, (STAGE_WIDTH * vh) / vw)));
  return { scale: Math.min(vw / STAGE_WIDTH, vh / height), height };
}

/**
 * Inline <head> script: sets --k-scale and --k-h on <html> before the first paint,
 * so the server-rendered canvas already has its final size (no layout shift when
 * React takes over). Same formula as stageFor().
 */
export const STAGE_BOOT_SCRIPT = `(function(){try{var w=innerWidth,h=innerHeight,H=Math.round(Math.min(${MAX_STAGE_HEIGHT},Math.max(${MIN_STAGE_HEIGHT},${STAGE_WIDTH}*h/w))),s=document.documentElement.style;s.setProperty('--k-h',H+'px');s.setProperty('--k-scale',String(Math.min(w/${STAGE_WIDTH},h/H)))}catch(e){}})()`;
