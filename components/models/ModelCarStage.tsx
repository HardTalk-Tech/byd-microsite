"use client";

import type { PointerEvent } from "react";
import { MODELS } from "@/content/models";
import { rgba } from "@/lib/style/rgba";
import { MediaImage } from "@/components/ui/MediaImage";
import { SweepShine } from "@/components/ui/SweepShine";

interface ModelCarStageProps {
  selectedIndex: number;
  swipeHandlers: {
    onPointerDown: (e: PointerEvent<HTMLElement>) => void;
    onPointerUp: (e: PointerEvent<HTMLElement>) => void;
    onPointerCancel: () => void;
  };
}

/**
 * 03 Models – accent glow, horizon line and the car cut-outs.
 * All 9 layers stay mounted and crossfade / slide when the model changes.
 * The transparent area on top takes swipes (change model) and taps (open 04 Experience).
 */
export function ModelCarStage({ selectedIndex, swipeHandlers }: ModelCarStageProps) {
  const selected = MODELS[selectedIndex];

  return (
    <>
      {MODELS.map((m, i) => (
        <div
          key={`glow-${m.slug}`}
          className="pointer-events-none absolute left-[640px] top-10 h-[720px] w-[1320px] transition-opacity duration-1100"
          style={{
            opacity: i === selectedIndex ? 1 : 0,
            background: `radial-gradient(ellipse 50% 50% at 50% 52%, ${rgba(m.accent, 0.62)} 0%, ${rgba(m.accent, 0.22)} 40%, transparent 72%)`,
          }}
        />
      ))}

      <div
        className="absolute inset-x-0 top-[610px] h-px"
        style={{ background: "linear-gradient(90deg, transparent 20%, rgba(201,162,74,0.45) 62%, transparent 95%)" }}
      />
      <div
        className="absolute inset-x-0 top-[611px] h-[110px]"
        style={{ background: "radial-gradient(ellipse 34% 100% at 66% 0%, rgba(255,255,255,0.06), transparent 75%)" }}
      />
      <SweepShine variant="screen" />

      {MODELS.map((m, i) => {
        const offset = i < selectedIndex ? -90 : i > selectedIndex ? 90 : 0;
        return (
          <div
            key={`car-${m.slug}`}
            aria-hidden={i !== selectedIndex}
            className="pointer-events-none absolute left-[800px] top-[170px] h-[430px] w-[1020px]"
            style={{
              opacity: i === selectedIndex ? 1 : 0,
              transform: `translateX(${offset}px)`,
              transition: "opacity 800ms ease, transform 900ms var(--ease-kiosk)",
            }}
          >
            <MediaImage
              path={m.media.cutout}
              alt={`${m.fullName} in ${m.colourName}`}
              width={1020}
              tint={m.accent}
              transparent
              radius={12}
              fit="contain"
              priority={i === selectedIndex}
            />
            <div
              className="absolute left-20 right-20 top-[432px] h-[90px] blur-[10px]"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${rgba(m.accent, 0.4)} 0%, transparent 70%)` }}
            />
          </div>
        );
      })}

      <div
        role="button"
        aria-label={`Explore the ${selected.fullName}`}
        className="absolute left-[780px] top-[140px] h-[500px] w-[1080px] touch-pan-y"
        {...swipeHandlers}
      />
    </>
  );
}
