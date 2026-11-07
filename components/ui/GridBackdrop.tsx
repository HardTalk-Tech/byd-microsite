interface GridBackdropProps {
  /** Line opacity (design: 0.03 Loading, 0.025 Models / Showrooms). */
  lineAlpha: number;
  /** Radial mask, e.g. "ellipse at 50% 50%, #000 10%, transparent 70%". */
  mask: string;
}

/** Faint 80 px grid with a radial fade. */
export function GridBackdrop({ lineAlpha, mask }: GridBackdropProps) {
  const line = `rgba(255,255,255,${lineAlpha})`;
  const maskImage = `radial-gradient(${mask})`;
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    />
  );
}
