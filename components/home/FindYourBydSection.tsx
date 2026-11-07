"use client";

import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { GlassButton } from "@/components/ui/GlassButton";
import { GoldButton } from "@/components/ui/GoldButton";
import { MediaImage } from "@/components/ui/MediaImage";

/** 02 Home – closing section with the three main actions. */
export function FindYourBydSection() {
  const { actions } = useKiosk();

  return (
    <section className="relative flex h-[820px] snap-end flex-col items-center justify-center gap-10 overflow-hidden">
      <div className="absolute inset-0 opacity-45">
        <MediaImage path={SITE_SETTINGS.media.modelLineup} alt="The BYD model line-up" width={1920} />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(10,10,11,0.55), rgba(10,10,11,0.95) 70%)" }}
      />
      <h2 className="relative font-display text-[96px] leading-none">Find your BYD</h2>
      <p className="relative text-[28px] text-ink-2">Nine models on display today</p>
      <div className="relative mt-4 flex gap-5">
        <GoldButton
          onClick={() => actions.goTo("models")}
          className="h-[88px] px-12 text-[24px] tracking-[0.18em]"
        >
          Explore Models
        </GoldButton>
        <GlassButton
          onClick={actions.guard(actions.openModal)}
          className="h-[88px] border-white/18 bg-surface-1/60 px-11 text-[24px] tracking-[0.18em] backdrop-blur-[20px]"
        >
          Book Test Drive
        </GlassButton>
        <GlassButton
          onClick={() => actions.goTo("showrooms")}
          className="h-[88px] border-white/18 bg-surface-1/60 px-11 text-[24px] tracking-[0.18em] backdrop-blur-[20px]"
        >
          Showrooms
        </GlassButton>
      </div>
      <div className="relative mt-3 text-[24px] text-ink-4">
        Hotline <span className="text-gold-light">{SITE_SETTINGS.contact.phone}</span>
        <span className="mx-3 text-ink-4/60">·</span>
        {SITE_SETTINGS.contact.callCentreHours}
      </div>
    </section>
  );
}
