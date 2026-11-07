import type { SpecItem } from "@/lib/types/content";

interface SpecValueProps {
  spec: SpecItem;
  /** sm: 03 Models strip (30 / 22). lg: 04b Details grid (48 / 24). */
  size: "sm" | "lg";
}

/**
 * A spec value: numbers in Michroma with a gold unit (as in the design);
 * text values (e.g. "BYD Blade Battery") in Sora so they fit their card.
 */
export function SpecValue({ spec, size }: SpecValueProps) {
  if (!spec.unit) {
    return (
      <div className={size === "lg" ? "text-[30px] leading-[1.2] font-medium text-ink" : "text-[26px] text-ink"}>
        {spec.value}
      </div>
    );
  }

  if (size === "sm") {
    return (
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <span className="font-display text-[30px]">{spec.value}</span>
        <span className="text-[22px] text-gold-light">{spec.unit}</span>
      </div>
    );
  }
  return (
    <div className="flex items-baseline gap-[10px] whitespace-nowrap">
      <span className="font-display text-[48px] leading-none text-ink">{spec.value}</span>
      <span className="text-[24px] text-gold-light">{spec.unit}</span>
    </div>
  );
}
