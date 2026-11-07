import { COMMON_FEATURES } from "@/content/home-content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CommonFeatureCard } from "./CommonFeatureCard";

/** 02 Home – "Across the range / In every BYD" section. */
export function InEveryBydSection() {
  return (
    <section
      className="relative flex snap-start flex-col gap-14 p-[120px]"
      style={{ background: "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(201,162,74,0.07), transparent 70%)" }}
    >
      <div className="flex flex-col gap-6">
        <Eyebrow>Across the range</Eyebrow>
        <h2 className="font-display text-[72px] leading-[1.1]">In every BYD</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {COMMON_FEATURES.map((feature, i) => (
          <CommonFeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
