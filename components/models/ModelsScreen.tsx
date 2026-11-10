"use client";

import { getVariant, MODELS } from "@/content/models";
import { useSwipe } from "@/hooks/useSwipe";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { SWIPE } from "@/lib/kiosk/timings";
import { pad2 } from "@/lib/style/rgba";
import { GlassButton } from "@/components/ui/GlassButton";
import { GoldButton } from "@/components/ui/GoldButton";
import { DesignFrame } from "@/components/ui/DesignFrame";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SweepShine } from "@/components/ui/SweepShine";
import { VariantSelector } from "@/components/ui/VariantSelector";
import { ModelCarStage } from "./ModelCarStage";
import { ModelIntro } from "./ModelIntro";
import { ModelRail } from "./ModelRail";
import { ModelSpecStrip } from "./ModelSpecStrip";
import { SwipeHint } from "./SwipeHint";

/** 03 Models – browse the 9 models. */
export function ModelsScreen() {
  const { state, actions, scale } = useKiosk();
  const selected = state.modelIndex;
  const model = MODELS[selected];

  const swipe = useSwipe({
    scale,
    minDistance: SWIPE.modelsMinPx,
    onSwipe: (direction) => actions.stepModel(direction === "left" ? 1 : -1),
    onTap: () => actions.goTo("experience"),
  });

  return (
    <div data-screen-label="03 Models" className="absolute inset-0 bg-kiosk-bg">
      <GridBackdrop lineAlpha={0.025} mask="ellipse at 62% 40%, #000 0%, transparent 65%" />
      <SweepShine variant="screen" />

      <DesignFrame>
      <ModelCarStage selectedIndex={selected} swipeHandlers={swipe} />

      {!state.swipeHintSeen && (
        <div className="pointer-events-none absolute left-[1080px] top-[640px]">
          <SwipeHint />
        </div>
      )}

      <div className="absolute right-[72px] top-[150px] text-[22px] tracking-[0.24em] text-ink-4">
        {pad2(selected + 1)} / {pad2(MODELS.length)}
      </div>

      <ModelIntro selectedIndex={selected} />
      <div className="absolute left-[120px] top-[352px]">
        <VariantSelector
          variants={model.variants}
          selectedIndex={state.variantIndex}
          onSelect={actions.selectVariant}
        />
      </div>
      <ModelSpecStrip variant={getVariant(model, state.variantIndex)} />

      <div className="absolute left-[120px] top-[608px] flex gap-4">
        <GoldButton
          arrow
          onClick={() => actions.goTo("experience")}
          className="h-[88px] gap-[18px] px-11 text-[24px] tracking-[0.2em]"
        >
          Explore
        </GoldButton>
        <GlassButton
          onClick={() => actions.goTo("experience", { details: true })}
          className="h-[88px] border-white/18 bg-surface-1/60 px-10 text-[24px] tracking-[0.18em]"
        >
          Full details
        </GlassButton>
      </div>
      </DesignFrame>

      <ModelRail selectedIndex={selected} onSelect={actions.selectModel} />
    </div>
  );
}
