"use client";

import { useEffect, useRef } from "react";
import { MODELS } from "@/content/models";
import { ModelRailCard } from "./ModelRailCard";

interface ModelRailProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const RAIL_PADDING = 120;
const CARD_STEP = 256; // 236 card + 20 gap
const CARD_HALF = 118;

const RAIL_MASK =
  "linear-gradient(90deg, transparent 0, #000 120px, #000 1800px, transparent 1920px)";

/** 03 Models – horizontally scrolling model picker; keeps the selected card centred. */
export function ModelRail({ selectedIndex, onSelect }: ModelRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const left = RAIL_PADDING + selectedIndex * CARD_STEP + CARD_HALF - el.clientWidth / 2;
    el.scrollTo({ left, behavior: firstRun.current ? "auto" : "smooth" });
    firstRun.current = false;
  }, [selectedIndex]);

  return (
    <div
      ref={railRef}
      data-rail
      className="scrollbar-none absolute inset-x-0 top-[760px] h-60 overflow-x-auto overflow-y-hidden"
      style={{ maskImage: RAIL_MASK, WebkitMaskImage: RAIL_MASK }}
    >
      <div className="flex w-max gap-5 px-[120px] py-[14px]">
        {MODELS.map((m, i) => (
          <ModelRailCard key={m.slug} model={m} selected={i === selectedIndex} onClick={() => onSelect(i)} />
        ))}
      </div>
    </div>
  );
}
