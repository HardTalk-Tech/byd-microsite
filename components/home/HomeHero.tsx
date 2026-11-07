"use client";

import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { GoldButton } from "@/components/ui/GoldButton";
import { MediaVideo } from "@/components/ui/MediaVideo";
import { ScrollCue } from "./ScrollCue";

/** 02 Home – first section: showreel, headline, Explore Models, scroll cue. */
export function HomeHero({ onScrollNext }: { onScrollNext: () => void }) {
  const { actions } = useKiosk();

  return (
    <section className="relative h-[1080px] snap-start">
      <div className="absolute inset-0">
        <MediaVideo
          path={SITE_SETTINGS.media.showreel}
          posterPath={SITE_SETTINGS.media.showreelPoster}
          tint="#C9A24A"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,11,1) 0%, rgba(10,10,11,0.7) 32%, rgba(10,10,11,0) 64%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-60"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,11,0.75), rgba(10,10,11,0))" }}
      />

      <div className="absolute inset-x-0 bottom-[250px] flex flex-col items-center gap-11">
        <h1 className="font-display text-[116px] leading-none tracking-[0.04em] text-ink [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">
          Drive the Future
        </h1>
        <GoldButton
          arrow
          onClick={() => actions.goTo("models")}
          className="h-[88px] gap-[18px] px-12 text-[24px] tracking-[0.2em]"
        >
          Explore Models
        </GoldButton>
      </div>

      <button
        type="button"
        onClick={onScrollNext}
        className="absolute bottom-11 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 border-0 bg-transparent px-6 py-3 text-gold-light active:opacity-70"
      >
        <div className="text-[22px] font-medium uppercase tracking-[0.32em]">Swipe up to discover</div>
        <ScrollCue />
      </button>
    </section>
  );
}
