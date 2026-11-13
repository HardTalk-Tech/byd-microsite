"use client";

import { BATTERY_POINTS, BLADE_BATTERY_SECTION } from "@/content/home-content";
import { SITE_VIDEO_LINKS } from "@/content/site-videos";
import { mediaUrl, placeholderLabel } from "@/lib/media/media-url";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { siteVideoUrl } from "@/lib/media/site-video";
import { useMediaDebug } from "@/lib/media/useMediaDebug";
import { pad2 } from "@/lib/style/rgba";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaImage } from "@/components/ui/MediaImage";
import { MediaVideo } from "@/components/ui/MediaVideo";

const PHOTO = "home/blade-battery.webp";

/**
 * 02 Home – Blade Battery, full screen (one stage height, like the hero).
 * Background: the Blade Battery film (content/site-videos.ts); the battery photo shows
 * while it loads, if it fails, or while the link is empty.
 * The film has its own captions at the bottom centre and titles at the top centre, so
 * the overlay text sits in a column on the left, over a dark gradient.
 */
export function BladeBatterySection() {
  const debug = useMediaDebug();
  const { state } = useKiosk();

  return (
    <section className="relative h-[var(--stage-h)] snap-start overflow-hidden bg-kiosk-bg">
      <MediaVideo
        // Not behind 01 Loading: the first launch is saving this file at the same time.
        src={state.loading ? null : siteVideoUrl("bladeBattery")}
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
      {/* Legibility: dark on the left, soft fades top (into the hero) and bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.86) 30%, rgba(10,10,11,0.45) 50%, rgba(10,10,11,0.08) 72%, rgba(10,10,11,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,11,1) 0%, rgba(10,10,11,0) 16%, rgba(10,10,11,0) 78%, rgba(10,10,11,0.85) 100%)",
        }}
      />

      <div className="absolute inset-y-0 left-[120px] flex w-[780px] flex-col justify-center pt-[110px] pb-[60px]">
        <Eyebrow>{BLADE_BATTERY_SECTION.eyebrow}</Eyebrow>
        <h2 className="mt-7 font-display text-[68px] leading-[1.1] text-pretty [text-shadow:0_4px_32px_rgba(0,0,0,0.6)]">
          {BLADE_BATTERY_SECTION.title}
        </h2>
        <p className="mt-6 max-w-[700px] text-[28px] leading-[1.5] text-pretty text-ink-2">
          {BLADE_BATTERY_SECTION.lead}
        </p>

        <ol className="mt-10 flex flex-col">
          {BATTERY_POINTS.map((point, i) => (
            <li key={point.title} className="flex gap-6 border-t border-white/10 py-5">
              <div className="pt-1 font-mono text-[22px] text-gold">{pad2(i + 1)}</div>
              <div className="flex flex-col gap-1.5">
                <div className="text-[28px] font-medium">{point.title}</div>
                <div className="text-[22px] leading-[1.45] text-pretty text-ink-3">{point.description}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
