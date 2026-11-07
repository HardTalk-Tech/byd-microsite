/** "#RRGGBB" + alpha → "rgba(r,g,b,a)". Used for accent glows. */
export function rgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** Zero-padded two-digit index, e.g. 1 → "01". */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
