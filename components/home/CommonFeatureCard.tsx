import { pad2 } from "@/lib/style/rgba";
import type { CommonFeature } from "@/lib/types/content";

export function CommonFeatureCard({ feature, index }: { feature: CommonFeature; index: number }) {
  return (
    <div className="flex min-h-[280px] flex-col gap-[18px] rounded-3xl border border-white/8 bg-surface-1/60 p-10 shadow-card">
      <div className="font-mono text-[22px] text-gold">{pad2(index + 1)}</div>
      <div className="text-[32px] font-medium">{feature.title}</div>
      <div className="text-[24px] leading-[1.5] text-pretty text-ink-3">{feature.description}</div>
    </div>
  );
}
