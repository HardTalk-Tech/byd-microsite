"use client";

import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { GlassButton } from "@/components/ui/GlassButton";
import { GoldButton } from "@/components/ui/GoldButton";
import { LineupStrip } from "./LineupStrip";

/** 02 Home – closing section with the three main actions. */
export function FindYourBydSection() {
  const { actions } = useKiosk();

  return (
    <section
      className="relative flex h-[900px] snap-end flex-col items-center justify-end gap-10 overflow-hidden pb-[110px]"
      style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(201,162,74,0.09), transparent 72%)" }}
    >
      <div className="absolute inset-x-0 top-[130px]">
        <LineupStrip />
      </div>
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
          className="h-[88px] border-white/18 bg-surface-1/60 px-11 text-[24px] tracking-[0.18em] backdrop-blur-[16px]"
        >
          Book Test Drive
        </GlassButton>
        <GlassButton
          onClick={() => actions.goTo("showrooms")}
          className="h-[88px] border-white/18 bg-surface-1/60 px-11 text-[24px] tracking-[0.18em] backdrop-blur-[16px]"
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
