import type { ModelVariant } from "@/lib/types/content";
import { SpecValue } from "@/components/ui/SpecValue";

/** 04b Details Panel – the variant's specs as cards, two per row, in spec-sheet order. */
export function DetailsSpecGrid({ variant }: { variant: ModelVariant }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {variant.specs.map((spec) => (
        <div
          key={spec.kind}
          className="flex flex-col gap-[14px] rounded-[20px] border border-white/8 bg-[rgba(255,255,255,0.035)] px-7 py-[26px] shadow-card"
        >
          <div className="text-[22px] uppercase tracking-[0.22em] text-ink-4">{spec.label}</div>
          <SpecValue spec={spec} size="lg" />
          {spec.note && <div className="text-[22px] text-ink-4">{spec.note}</div>}
        </div>
      ))}
    </div>
  );
}
