import type { MapLabel } from "@/lib/types/content";

interface MapPinProps {
  name: string;
  /** Number of showrooms behind this pin (cluster pins show it as a badge). */
  count: number;
  /** Pin centre in the map container (px). */
  x: number;
  y: number;
  label: MapLabel;
  selected: boolean;
  /** Accessible name, e.g. "Colombo – 3 showrooms". */
  ariaLabel: string;
  onClick: () => void;
}

const HIT = 72; // touch area around the dot
const DOT = 24;
const UNSELECTED_SCALE = 16 / 24;

/** Gold pin with a name label on the Sri Lanka map. The label is part of the touch target. */
export function MapPin({ name, count, x, y, label, selected, ariaLabel, onClick }: MapPinProps) {
  const onRight = label.side === "right";
  // The dot grows 16 → 24 px by scale (transform only). Shadow sizes are
  // compensated so the unselected ring and glow match the design after scaling.
  const ring = selected ? 6 : 6 / UNSELECTED_SCALE;
  const glow = selected ? 26 : 10 / UNSELECTED_SCALE;

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onClick}
      className="absolute flex items-center justify-center border-0 bg-transparent p-0 transition-colors duration-400 active:opacity-80"
      style={{
        left: x - HIT / 2,
        top: y - HIT / 2,
        width: HIT,
        height: HIT,
        color: selected ? "#E8C875" : "#C9CCD2",
      }}
    >
      <span
        className="rounded-full"
        style={{
          width: DOT,
          height: DOT,
          background: "linear-gradient(135deg,#C9A24A,#E8C875)",
          boxShadow: `0 0 0 ${ring}px rgba(232,200,117,0.12), 0 0 ${glow}px rgba(232,200,117,0.85)`,
          transform: `scale(${selected ? 1 : UNSELECTED_SCALE})`,
          transition: "transform 400ms ease, box-shadow 400ms ease",
        }}
      />
      <span
        className="absolute flex items-center gap-[10px] text-[24px] whitespace-nowrap [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]"
        style={{
          top: HIT / 2 + (label.dy ?? 0),
          transform: "translateY(-50%)",
          flexDirection: onRight ? "row" : "row-reverse",
          ...(onRight ? { left: HIT + 2 - 18 } : { right: HIT + 2 - 18 }),
          fontWeight: selected ? 600 : 400,
        }}
      >
        {name}
        {count > 1 && (
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-[rgba(232,200,117,0.6)] bg-[rgba(10,10,11,0.75)] px-2 font-mono text-[22px] leading-none text-gold-light [text-shadow:none]">
            {count}
          </span>
        )}
      </span>
    </button>
  );
}
