const VARIANTS = {
  /** Loading screen and Test Drive Modal. */
  slow: { colour: "232,200,117", alpha: 0.08, seconds: 9, width: "26%" },
  /** 03 Models background. */
  screen: { colour: "232,200,117", alpha: 0.05, seconds: 11, width: "22%" },
  /** Gold buttons. */
  button: { colour: "255,255,255", alpha: 0.55, seconds: 5, width: "30%" },
} as const;

/** Diagonal light sweep (design keyframe kSweep). */
export function SweepShine({ variant }: { variant: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true" data-motion="hide">
      <div
        className="absolute left-0 top-[-50%] h-[200%]"
        style={{
          width: v.width,
          background: `linear-gradient(90deg, transparent, rgba(${v.colour},${v.alpha}), transparent)`,
          animation: `kSweep ${v.seconds}s ease-in-out infinite`,
        }}
      />
    </div>
  );
}
