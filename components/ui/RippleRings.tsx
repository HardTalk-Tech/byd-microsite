interface RippleRingsProps {
  /** Centre of the rings in the parent's coordinates (px). */
  x: number;
  y: number;
  /** Ring diameter (design: 120 map pin, 140 platform hotspot). */
  size: number;
  count?: number;
  seconds?: number;
}

/**
 * Expanding gold rings (design keyframe kRipple).
 * Moves to a new position with a 500 ms transform transition.
 */
export function RippleRings({ x, y, size, count = 2, seconds = 2.8 }: RippleRingsProps) {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 transition-transform duration-500"
      style={{ width: size, height: size, transform: `translate(${x - size / 2}px, ${y - size / 2}px)` }}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          data-motion="loop"
          className="absolute inset-0 rounded-full border-[1.5px] border-[rgba(232,200,117,0.85)] opacity-0"
          style={{ animation: `kRipple ${seconds}s var(--ease-ripple) ${(i * seconds) / count}s infinite` }}
        />
      ))}
    </div>
  );
}
