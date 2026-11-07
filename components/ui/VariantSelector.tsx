import type { ModelVariant } from "@/lib/types/content";
import { cn } from "@/lib/style/cn";

interface VariantSelectorProps {
  variants: readonly ModelVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  /** Narrow containers: tighter pills, and wrap onto a second row only if still too wide. */
  compact?: boolean;
}

/** Same on / off look as the design's segment buttons (Exterior / Interior, Day / Night). */
const ON = {
  background: "rgba(201,162,74,0.16)",
  borderColor: "rgba(232,200,117,0.75)",
  color: "#E8C875",
  boxShadow: "0 0 28px rgba(232,200,117,0.35), inset 0 0 18px rgba(232,200,117,0.12)",
};
const OFF = {
  background: "rgba(22,23,26,0.6)",
  borderColor: "rgba(255,255,255,0.12)",
  color: "#C9CCD2",
  boxShadow: "0 0 0 rgba(0,0,0,0)",
};

const PILL_BASE =
  "flex h-16 items-center rounded-full border border-solid text-[22px] font-medium uppercase whitespace-nowrap";
const PILL_REGULAR = "px-6 tracking-[0.12em]";
const PILL_COMPACT = "px-5 tracking-[0.06em]";

/**
 * Variant (trim) picker: pills for models with several variants, a static label
 * for a single named variant, nothing for a model sold in one unnamed version.
 */
export function VariantSelector({ variants, selectedIndex, onSelect, compact = false }: VariantSelectorProps) {
  const pill = cn(PILL_BASE, compact ? PILL_COMPACT : PILL_REGULAR);

  if (variants.length === 1) {
    const only = variants[0];
    return only.name ? (
      <div className="flex">
        <div className={pill} style={ON}>
          {only.name}
        </div>
      </div>
    ) : null;
  }

  return (
    <div role="group" aria-label="Variant" className={cn("flex", compact ? "flex-wrap gap-[10px]" : "gap-3")}>
      {variants.map((variant, i) => {
        const selected = i === selectedIndex;
        return (
          <button
            key={variant.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(i)}
            className={cn(pill, "transition-all duration-400 active:scale-96")}
            style={selected ? ON : OFF}
          >
            {variant.name}
          </button>
        );
      })}
    </div>
  );
}
