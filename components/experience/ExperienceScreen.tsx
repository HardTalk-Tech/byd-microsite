"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { MODELS, wrapModelIndex } from "@/content/models";
import { useSwipe } from "@/hooks/useSwipe";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { KIOSK_TIMINGS, SWIPE } from "@/lib/kiosk/timings";
import type { ClipKey } from "@/lib/types/content";
import { DetailsPanel } from "./DetailsPanel";
import { ExperienceActions } from "./ExperienceActions";
import { ExperienceModelBadge } from "./ExperienceModelBadge";
import { ExperienceVideoStage } from "./ExperienceVideoStage";
import { GalleryFullscreen } from "./GalleryFullscreen";
import { ModelStepButton } from "./ModelStepButton";
import { ViewTimeControls } from "./ViewTimeControls";

/** Pointer-events switch read by the control groups via `var(--ctrl-pe)`. */
function controlsPointer(enabled: boolean): CSSProperties {
  return { ["--ctrl-pe" as string]: enabled ? "auto" : "none" };
}

/** 04 Experience – full-screen drive video for one model. */
export function ExperienceScreen({ modelIndex }: { modelIndex: number }) {
  const { state, actions, scale } = useKiosk();
  const model = MODELS[modelIndex];
  const clip: ClipKey = `${state.view}-${state.time}`;

  // Keep the shared selection in step with the route, then lift the dip to black.
  useEffect(() => {
    actions.syncModelFromRoute(modelIndex);
    const timer = setTimeout(actions.endDip, KIOSK_TIMINGS.dipReleaseMs);
    return () => clearTimeout(timer);
  }, [actions, modelIndex]);

  // Let the panel mount closed for one frame, so "Full details" slides it in.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const detailsOpen = state.detailsOpen && mounted;
  const showControls = state.controlsVisible || state.detailsOpen;
  const mainVisible = !state.detailsOpen;

  const swipe = useSwipe({
    scale,
    minDistance: SWIPE.experienceMinPx,
    onSwipe: (direction) => {
      if (!state.detailsOpen) actions.stepExperienceModel(modelIndex, direction === "left" ? 1 : -1);
    },
  });

  return (
    <div data-screen-label="04 Experience" className="absolute inset-0 bg-black">
      <ExperienceVideoStage model={model} clip={clip} />

      {/* Swipe layer: changes model; any touch also reveals the controls. */}
      <div className="absolute inset-0 touch-none" {...swipe} />

      <div
        className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-360"
        style={{ opacity: state.dip ? 1 : 0 }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: showControls ? 1 : 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,11,0.75) 0%, rgba(10,10,11,0) 22%, rgba(10,10,11,0) 70%, rgba(10,10,11,0.8) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: showControls ? 1 : 0, ...controlsPointer(showControls) }}
      >
        <ExperienceModelBadge model={model} onBack={actions.guard(() => actions.goTo("models"))} />

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{ opacity: mainVisible ? 1 : 0, ...controlsPointer(showControls && mainVisible) }}
        >
          <ModelStepButton
            direction="prev"
            targetName={MODELS[wrapModelIndex(modelIndex - 1)].fullName}
            onClick={actions.guard(() => actions.stepExperienceModel(modelIndex, -1))}
          />
          <ModelStepButton
            direction="next"
            targetName={MODELS[wrapModelIndex(modelIndex + 1)].fullName}
            onClick={actions.guard(() => actions.stepExperienceModel(modelIndex, 1))}
          />
          <ViewTimeControls
            view={state.view}
            time={state.time}
            onView={actions.guard(actions.setView)}
            onTime={actions.guard(actions.setTime)}
          />
          <ExperienceActions
            onDetails={actions.guard(actions.openDetails)}
            onBookTestDrive={actions.guard(actions.openModal)}
          />
        </div>
      </div>

      <div
        onClick={actions.closeDetails}
        className="absolute inset-0 bg-[rgba(5,5,6,0.5)] transition-opacity duration-600"
        style={{ opacity: detailsOpen ? 1 : 0, pointerEvents: detailsOpen ? "auto" : "none" }}
      />
      <DetailsPanel
        model={model}
        variantIndex={state.variantIndex}
        open={detailsOpen}
        onClose={actions.closeDetails}
        onSelectVariant={actions.selectVariant}
        onOpenGallery={actions.openGallery}
      />

      <GalleryFullscreen
        model={model}
        index={state.galleryIndex}
        onStep={actions.stepGallery}
        onClose={actions.closeGallery}
      />
    </div>
  );
}
