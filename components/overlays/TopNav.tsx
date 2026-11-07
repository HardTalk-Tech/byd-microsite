"use client";

import { useKiosk } from "@/lib/kiosk/KioskProvider";
import type { ScreenKey } from "@/lib/kiosk/KioskProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { GoldButton } from "@/components/ui/GoldButton";

const NAV_ITEMS: ReadonlyArray<{ screen: ScreenKey; label: string }> = [
  { screen: "home", label: "Home" },
  { screen: "models", label: "Models" },
  { screen: "experience", label: "Experience" },
  { screen: "showrooms", label: "Showrooms" },
];

/** Global chrome: logo (top-left) and the glass pill navigation (top-centre). */
export function TopNav() {
  const { state, screen, actions } = useKiosk();

  const onExperience = screen === "experience";
  const visible =
    !state.loading &&
    state.galleryIndex === null &&
    !(onExperience && state.detailsOpen && !state.modalOpen) &&
    (!onExperience || state.controlsVisible || state.modalOpen);

  return (
    <>
      <div
        className="pointer-events-none absolute left-[72px] top-12 transition-opacity duration-600"
        style={{ opacity: visible ? 1 : 0, viewTransitionName: "kiosk-logo" }}
      >
        <BrandLogo width={200} height={64} align="left" />
      </div>

      <nav
        aria-label="Main"
        inert={!visible}
        className="absolute left-1/2 top-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/9 bg-surface-1/60 p-2 shadow-glass-float backdrop-glass transition-opacity duration-600"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          viewTransitionName: "kiosk-nav",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const active = screen === item.screen && !state.modalOpen;
          return (
            <button
              key={item.screen}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => actions.goTo(item.screen)}
              className="relative flex h-[72px] items-center rounded-full border-0 px-[30px] text-[22px] font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-400 active:scale-96 active:shadow-row-pressed"
              style={{
                background: active ? "rgba(201,162,74,0.12)" : "transparent",
                color: active ? "#E8C875" : "#C9CCD2",
              }}
            >
              {item.label}
              <div
                className="absolute bottom-2 left-1/2 ml-[-16px] h-[2px] w-8 rounded-[2px] bg-gold-light shadow-[0_0_10px_#E8C875] transition-opacity duration-400"
                style={{ opacity: active ? 1 : 0 }}
              />
            </button>
          );
        })}
        <GoldButton
          onClick={actions.guard(actions.openModal)}
          className="ml-[6px] h-[72px] px-8 text-[22px] tracking-[0.1em]"
          style={{
            boxShadow: state.modalOpen
              ? "0 0 0 2px rgba(232,200,117,0.9), 0 0 40px rgba(232,200,117,0.6)"
              : "0 0 24px rgba(201,162,74,0.35)",
            transition: "scale 160ms ease, box-shadow 300ms ease",
          }}
        >
          Test Drive
        </GoldButton>
      </nav>
    </>
  );
}
