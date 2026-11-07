import type { ReactNode } from "react";
import { qrSvg } from "@/lib/qr/qr-matrix";

interface QrCodeProps {
  /** What the code is for, e.g. "[QR: test drive]". Shown on the placeholder; used as the accessible name. */
  label: string;
  /** Inner code size in px (design uses 380, 190, 132, 104). */
  size: number;
  /** URL to encode. While null, the design's placeholder pattern is shown. */
  value?: string | null;
}

/** Light quiet zone around the code, in modules (scanners need a light margin). */
const QUIET_ZONE = 2;

/**
 * QR code in the design's gold frame.
 * With a `value`, renders a real, scannable code (generated locally, works offline):
 * dark modules on a light-gold square, which every phone scanner reads.
 * Without a `value`, renders the design's placeholder pattern and label.
 */
export function QrCode({ label, size, value }: QrCodeProps) {
  const px = (v: number) => `${Math.round(v)}px`;

  return (
    <div
      className="inline-flex rounded-[20px] p-[2px] shadow-[0_0_36px_rgba(201,162,74,0.28)]"
      style={{ background: "linear-gradient(135deg,#C9A24A 0%,#E8C875 50%,#C9A24A 100%)" }}
      role="img"
      aria-label={value ? `QR code: ${value}` : label}
    >
      <div className="rounded-[18px] bg-qr-plate" style={{ padding: px(Math.max(10, size * 0.07)) }}>
        {value ? <QrCodeImage value={value} size={size} /> : <QrPlaceholder label={label} size={size} />}
      </div>
    </div>
  );
}

function QrCodeImage({ value, size }: { value: string; size: number }) {
  const { size: modules, path } = qrSvg(value);
  const box = modules + QUIET_ZONE * 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${box} ${box}`}
      shapeRendering="crispEdges"
      className="block rounded-md"
      aria-hidden="true"
    >
      <rect width={box} height={box} fill="#E8C875" />
      <path d={path} fill="#0E0F11" transform={`translate(${QUIET_ZONE} ${QUIET_ZONE})`} />
    </svg>
  );
}

function QrPlaceholder({ label, size }: { label: string; size: number }) {
  const px = (v: number) => `${Math.round(v)}px`;
  const finder = px(size * 0.24);
  const finderBorder = px(Math.max(3, size * 0.035));
  const finderInner = px(size * 0.09);
  const gutter = px(size * 0.02);

  const corner = (position: string): ReactNode => (
    <div className={`absolute ${position} bg-qr-plate`} style={{ padding: gutter }}>
      <div
        className="flex items-center justify-center border-solid border-gold-light"
        style={{ width: finder, height: finder, borderWidth: finderBorder }}
      >
        <div className="bg-gold-light" style={{ width: finderInner, height: finderInner }} />
      </div>
    </div>
  );

  return (
    <div
      className="relative"
      style={{
        width: px(size),
        height: px(size),
        backgroundImage: "repeating-conic-gradient(rgba(232,200,117,0.26) 0% 25%, transparent 0% 50%)",
        backgroundSize: `${px(size / 12)} ${px(size / 12)}`,
      }}
    >
      {corner("left-0 top-0")}
      {corner("right-0 top-0")}
      {corner("left-0 bottom-0")}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="max-w-[90%] rounded-md bg-qr-plate px-2.5 py-1.5 text-center font-mono text-gold-light"
          style={{ fontSize: size < 160 ? 12 : 16 }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
