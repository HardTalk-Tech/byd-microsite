import { STRIP_LABEL, stripSpecs } from "@/content/models";
import type { ModelVariant } from "@/lib/types/content";
import { SpecValue } from "@/components/ui/SpecValue";

/** 03 Models – the selected variant's 3 key specs between two hairlines. */
export function ModelSpecStrip({ variant }: { variant: ModelVariant }) {
  return (
    <div className="absolute left-[120px] top-[440px] flex items-stretch border-y border-white/8 py-4">
      {stripSpecs(variant).map((spec) => (
        <div key={spec.kind} className="mr-[30px] flex flex-col gap-2 border-r border-white/8 pr-[30px]">
          <div className="text-[22px] uppercase tracking-[0.18em] text-ink-4">{STRIP_LABEL[spec.kind]}</div>
          <SpecValue spec={spec} size="sm" />
          <div className="text-[22px] whitespace-nowrap text-ink-4">{spec.stripNote ?? spec.note ?? " "}</div>
        </div>
      ))}
    </div>
  );
}
