interface AccentDotProps {
  colour: string;
  size: number;
  /** Outer glow radius in px (0 = no glow). */
  glow?: number;
}

/** Model colour swatch with a thin light ring. */
export function AccentDot({ colour, size, glow = 0 }: AccentDotProps) {
  return (
    <div
      className="flex-none rounded-full"
      style={{
        width: size,
        height: size,
        background: colour,
        boxShadow: glow
          ? `0 0 0 2px rgba(255,255,255,0.18), 0 0 ${glow}px ${colour}`
          : "0 0 0 2px rgba(255,255,255,0.18)",
      }}
    />
  );
}
