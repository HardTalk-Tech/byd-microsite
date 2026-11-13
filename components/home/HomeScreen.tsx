"use client";

import { useEffect, useRef } from "react";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { KIOSK_TIMINGS } from "@/lib/kiosk/timings";
import { BladeBatterySection } from "./BladeBatterySection";
import { FindYourBydSection } from "./FindYourBydSection";
import { HomeHero } from "./HomeHero";
import { InEveryBydSection } from "./InEveryBydSection";

/** 02 Home – vertically scrolling start / attract screen. */
export function HomeScreen() {
  const { state, actions, stageHeight } = useKiosk();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { homeScrollToken } = state;

  // Back to the top whenever Home is (re)selected or the kiosk resets.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [homeScrollToken]);

  return (
    <div
      ref={scrollRef}
      data-screen-label="02 Home"
      onScroll={(e) => actions.setHomeScrolled(e.currentTarget.scrollTop > KIOSK_TIMINGS.homeScrolledPx)}
      className="scrollbar-none absolute inset-0 snap-y snap-proximity overflow-x-hidden overflow-y-auto bg-kiosk-bg"
    >
      <HomeHero
        onScrollNext={() => scrollRef.current?.scrollTo({ top: stageHeight, behavior: "smooth" })}
      />
      <BladeBatterySection />
      <InEveryBydSection />
      <FindYourBydSection />
    </div>
  );
}
