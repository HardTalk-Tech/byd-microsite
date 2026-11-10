import type { BatteryPoint } from "@/lib/types/content";

export function BatteryPointCard({ point }: { point: BatteryPoint }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface-1/60 px-9 pt-9 pb-10 backdrop-blur-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_0_36px_rgba(201,162,74,0.04)]">
      <div className="h-[2px] w-12 bg-gold-line shadow-[0_0_12px_rgba(232,200,117,0.6)]" />
      <div className="text-[30px] font-medium">{point.title}</div>
      <div className="text-[24px] leading-[1.5] text-pretty text-ink-3">{point.description}</div>
    </div>
  );
}
