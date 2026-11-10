"use client";

import { BATTERY_POINTS } from "@/content/home-content";
import { SITE_VIDEO_LINKS } from "@/content/site-videos";
import { mediaUrl, placeholderLabel } from "@/lib/media/media-url";
import { siteVideoUrl } from "@/lib/media/site-video";
import { useMediaDebug } from "@/lib/media/useMediaDebug";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaImage } from "@/components/ui/MediaImage";
import { MediaVideo } from "@/components/ui/MediaVideo";
import { BatteryPointCard } from "./BatteryPointCard";

const PHOTO = "home/blade-battery.webp";

/**
 * 02 Home – Blade Battery, full-width cinematic band.
 * Background: the Blade Battery video link (content/site-videos.ts); the battery
 * photo shows while it loads, if it fails, or while the link is a dummy.
 */
export function BladeBatterySection() {
  const debug = useMediaDebug();

  return (
    <section className="relative h-[1040px] snap-start overflow-hidden">
      <MediaVideo
        src={siteVideoUrl("bladeBattery")}
        poster={mediaUrl(PHOTO) ?? undefined}
        fallback={
          <div className="absolute inset-0">
            <MediaImage path={PHOTO} alt="BYD Blade Battery cells" width={1920} />
            {debug && (
              <div className="absolute right-6 top-6 rounded-md bg-[rgba(10,10,11,0.7)] px-3 py-2 font-mono text-[16px] text-gold-label">
                {placeholderLabel("video", SITE_VIDEO_LINKS.bladeBattery)}
              </div>
            )}
          </div>
        }
      />
      {/* Legibility: dark on the left and bottom, blends into the hero above */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,11,0.96) 0%, rgba(10,10,11,0.82) 34%, rgba(10,10,11,0.25) 66%, rgba(10,10,11,0.1) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,11,1) 0%, rgba(10,10,11,0) 18%, rgba(10,10,11,0) 52%, rgba(10,10,11,0.92) 82%, rgba(10,10,11,1) 100%)",
        }}
      />

      <div className="absolute left-[120px] top-[150px] flex w-[760px] flex-col gap-8">
        <Eyebrow>Blade Battery</Eyebrow>
        <h2 className="font-display text-[72px] leading-[1.1] text-pretty">The battery is the structure</h2>
        <p className="max-w-[680px] text-[28px] leading-[1.55] text-pretty text-ink-2">
          Long, thin LFP cells are arranged like blades and fitted straight into the pack, with no bulky
          modules in between. The cells help carry the load, so more of the pack is used to store energy.
        </p>
      </div>

      <div className="absolute inset-x-[120px] bottom-[100px] grid grid-cols-3 gap-6">
        {BATTERY_POINTS.map((point) => (
          <BatteryPointCard key={point.title} point={point} />
        ))}
      </div>
    </section>
  );
}
