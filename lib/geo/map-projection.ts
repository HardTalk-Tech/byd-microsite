/**
 * Converts real coordinates to the design's Sri Lanka outline (560 × 860 viewBox).
 *
 * The outline is a plain lat / long (equirectangular) drawing. These constants were
 * fitted (least squares) to the design's original pins, which sit on the real
 * coordinates of their towns; the fit is within ~3 viewBox units, and it puts
 * Point Pedro and Dondra Head on the outline's north and south tips.
 */
const X_PER_LNG = 216.157;
const X_OFFSET = -17183.385;
const Y_PER_LAT = -216.977;
const Y_OFFSET = 2141.156;

export const MAP_VIEWBOX = { width: 560, height: 860 } as const;

export function projectToMap(lat: number, lng: number): { x: number; y: number } {
  return { x: X_PER_LNG * lng + X_OFFSET, y: Y_PER_LAT * lat + Y_OFFSET };
}
