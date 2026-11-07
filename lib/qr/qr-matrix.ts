import QRCode from "qrcode";

export interface QrSvg {
  /** Modules per side (without quiet zone). */
  size: number;
  /** SVG path covering every dark module, in module units. */
  path: string;
}

/**
 * Encodes `value` as a QR code and returns it as one SVG path.
 * Runs locally (no QR web service), so it works offline.
 * Error correction "M" keeps codes small but tolerant of glare on the screen.
 */
export function qrSvg(value: string): QrSvg {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
  const size = modules.size;
  let path = "";

  for (let y = 0; y < size; y++) {
    let x = 0;
    while (x < size) {
      if (!modules.get(y, x)) {
        x++;
        continue;
      }
      // Merge a horizontal run of dark modules into one rectangle.
      const start = x;
      while (x < size && modules.get(y, x)) x++;
      path += `M${start} ${y}h${x - start}v1h${start - x}z`;
    }
  }
  return { size, path };
}
