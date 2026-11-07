"use client";

import { PLATFORM_HOTSPOTS } from "@/content/home-content";
import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { pad2 } from "@/lib/style/rgba";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaImage } from "@/components/ui/MediaImage";
import { RippleRings } from "@/components/ui/RippleRings";
import { SelectableRow } from "@/components/ui/SelectableRow";
import { PlatformHotspotMarker } from "./PlatformHotspotMarker";

/** 02 Home – e-Platform 3.0 section with selectable hotspots. */
export function EPlatformSection() {
  const { state, actions } = useKiosk();
  const selected = state.hotspotIndex;
  const hotspot = PLATFORM_HOTSPOTS[selected];

  return (
    <section className="relative flex snap-start flex-col gap-14 p-[120px]">
      <div className="flex flex-col gap-6">
        <Eyebrow>e-Platform 3.0</Eyebrow>
        <h2 className="font-display text-[72px] leading-[1.1]">Built electric from the ground up</h2>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_560px] items-stretch gap-12">
        <div className="relative h-[640px] overflow-hidden rounded-[28px]">
          <div className="absolute inset-0">
            <MediaImage
              path={SITE_SETTINGS.media.ePlatform}
              alt="e-Platform 3.0 exploded chassis view"
              width={1072}
              radius={28}
            />
          </div>
          <RippleRings x={hotspot.x} y={hotspot.y} size={140} />
          {PLATFORM_HOTSPOTS.map((h, i) => (
            <PlatformHotspotMarker
              key={h.title}
              hotspot={h}
              index={i}
              selected={i === selected}
              onClick={() => actions.selectHotspot(i)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col gap-5 rounded-[28px] border border-[rgba(201,162,74,0.4)] bg-surface-1/60 p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_40px_rgba(201,162,74,0.06)] backdrop-blur-[24px]">
            <div className="font-mono text-[22px] text-gold">
              {pad2(selected + 1)} / {pad2(PLATFORM_HOTSPOTS.length)}
            </div>
            <div className="font-display text-[34px] leading-[1.25] text-pretty">{hotspot.title}</div>
            <div className="text-[26px] leading-[1.5] text-pretty text-ink-2">{hotspot.description}</div>
          </div>
          {PLATFORM_HOTSPOTS.map((h, i) => (
            <SelectableRow
              key={h.title}
              variant="hotspot"
              index={i}
              title={h.title}
              selected={i === selected}
              onClick={() => actions.selectHotspot(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
