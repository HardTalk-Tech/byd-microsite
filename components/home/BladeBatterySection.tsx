import { BATTERY_POINTS } from "@/content/home-content";
import { SITE_SETTINGS } from "@/content/site-settings";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaImage } from "@/components/ui/MediaImage";
import { BatteryPointCard } from "./BatteryPointCard";

/** 02 Home – Blade Battery section. */
export function BladeBatterySection() {
  return (
    <section
      className="relative flex snap-start flex-col gap-16 px-[120px] pt-[150px] pb-[120px]"
      style={{ background: "radial-gradient(ellipse 50% 60% at 75% 35%, rgba(201,162,74,0.10), transparent 70%)" }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-20">
        <div className="flex flex-col gap-8">
          <Eyebrow>Blade Battery</Eyebrow>
          <h2 className="font-display text-[72px] leading-[1.1] text-pretty">The battery is the structure</h2>
          <p className="max-w-[680px] text-[28px] leading-[1.55] text-pretty text-ink-2">
            Long, thin LFP cells are arranged like blades and fitted straight into the pack, with no bulky
            modules in between. The cells help carry the load, so more of the pack is used to store energy.
          </p>
        </div>
        <div className="relative h-[600px]">
          <div
            className="pointer-events-none absolute inset-[-60px]"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,162,74,0.22), transparent 65%)" }}
          />
          <div className="absolute inset-0">
            <MediaImage
              path={SITE_SETTINGS.media.bladeBattery}
              alt="Blade Battery cell-to-pack cut-away"
              width={856}
              transparent
              radius={24}
              fit="contain"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {BATTERY_POINTS.map((point) => (
          <BatteryPointCard key={point.title} point={point} />
        ))}
      </div>
    </section>
  );
}
