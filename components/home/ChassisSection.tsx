"use client";

import { CHASSIS_IMAGE, CHASSIS_PARTS, CHASSIS_SECTION } from "@/content/home-content";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { pad2 } from "@/lib/style/rgba";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaImage } from "@/components/ui/MediaImage";
import { RippleRings } from "@/components/ui/RippleRings";
import { SelectableRow } from "@/components/ui/SelectableRow";
import { ChassisPartMarker } from "./ChassisPartMarker";

/** Rendered chassis size (keeps the image's proportions). */
const STAGE_W = 1160;
const STAGE_H = Math.round((STAGE_W * CHASSIS_IMAGE.height) / CHASSIS_IMAGE.width);
const SX = STAGE_W / CHASSIS_IMAGE.width;
const SY = STAGE_H / CHASSIS_IMAGE.height;

const clipPath = (outline: ReadonlyArray<readonly [number, number]>) =>
  `polygon(${outline
    .map(([x, y]) => `${((x / CHASSIS_IMAGE.width) * 100).toFixed(2)}% ${((y / CHASSIS_IMAGE.height) * 100).toFixed(2)}%`)
    .join(", ")})`;

const centre = (outline: ReadonlyArray<readonly [number, number]>) => {
  const [sx, sy] = outline.reduce(([ax, ay], [x, y]) => [ax + x, ay + y], [0, 0]);
  return { x: (sx / outline.length) * SX, y: (sy / outline.length) * SY };
};

/**
 * 02 Home – interactive chassis. Tap a part (on the image, its marker or its row):
 * it lights up in full colour with a glowing gold outline while the rest dims.
 */
export function ChassisSection() {
  const { state, actions } = useKiosk();
  const selected = Math.min(state.hotspotIndex, CHASSIS_PARTS.length - 1);
  const part = CHASSIS_PARTS[selected];
  const focus = centre(part.outline);

  return (
    <section
      className="relative flex snap-start flex-col gap-12 overflow-hidden px-[120px] pt-[120px] pb-[110px]"
      style={{
        background:
          "radial-gradient(ellipse 55% 60% at 35% 58%, rgba(201,162,74,0.12), transparent 70%), radial-gradient(ellipse 40% 40% at 85% 30%, rgba(90,110,170,0.10), transparent 70%)",
      }}
    >
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-6">
          <Eyebrow>{CHASSIS_SECTION.eyebrow}</Eyebrow>
          <h2 className="font-display text-[72px] leading-[1.1]">{CHASSIS_SECTION.title}</h2>
        </div>
        <div className="pb-3 text-[24px] text-ink-4">{CHASSIS_SECTION.hint}</div>
      </div>

      <div className="flex items-center gap-12">
        {/* Chassis stage */}
        <div className="relative flex-none" style={{ width: STAGE_W, height: STAGE_H }}>
          {/* Dimmed base */}
          <div className="absolute inset-0 opacity-40 saturate-50 transition-opacity duration-500">
            <MediaImage path={CHASSIS_IMAGE.path} alt="BYD plug-in hybrid chassis" width={STAGE_W} fit="contain" transparent />
          </div>
          {/* Full-colour copy of each part (only the selected one is visible) */}
          {CHASSIS_PARTS.map((p, i) => (
            <div
              key={p.title}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{ clipPath: clipPath(p.outline), opacity: i === selected ? 1 : 0 }}
            >
              <MediaImage path={CHASSIS_IMAGE.path} alt="" width={STAGE_W} fit="contain" transparent />
              <div className="absolute inset-0 bg-[rgba(232,200,117,0.14)] mix-blend-screen" />
            </div>
          ))}
          {/* Outlines: tap targets; selected one glows gold */}
          <svg
            viewBox={`0 0 ${CHASSIS_IMAGE.width} ${CHASSIS_IMAGE.height}`}
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {CHASSIS_PARTS.map((p, i) => {
              const isSel = i === selected;
              return (
                <polygon
                  key={p.title}
                  role="button"
                  aria-label={p.title}
                  aria-pressed={isSel}
                  points={p.outline.map(([x, y]) => `${x},${y}`).join(" ")}
                  onClick={() => actions.selectHotspot(i)}
                  className="cursor-pointer transition-all duration-500"
                  fill={isSel ? "rgba(232,200,117,0.06)" : "rgba(0,0,0,0.001)"}
                  stroke={isSel ? "#E8C875" : "rgba(232,200,117,0.32)"}
                  strokeWidth={isSel ? 3 : 1.6}
                  strokeDasharray={isSel ? undefined : "8 7"}
                  strokeLinejoin="round"
                  style={{ filter: isSel ? "drop-shadow(0 0 10px rgba(232,200,117,0.85))" : undefined }}
                />
              );
            })}
          </svg>
          <RippleRings x={focus.x} y={focus.y} size={150} />
          {CHASSIS_PARTS.map((p, i) => {
            const c = centre(p.outline);
            return (
              <ChassisPartMarker
                key={p.title}
                index={i}
                title={p.title}
                x={c.x}
                y={c.y}
                selected={i === selected}
                onClick={() => actions.selectHotspot(i)}
              />
            );
          })}
        </div>

        {/* Info + list */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex min-h-[300px] flex-col gap-5 rounded-[28px] border border-[rgba(201,162,74,0.4)] bg-surface-1/60 p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_40px_rgba(201,162,74,0.06)] backdrop-blur-[16px]">
            <div className="font-mono text-[22px] text-gold">
              {pad2(selected + 1)} / {pad2(CHASSIS_PARTS.length)}
            </div>
            <div className="font-display text-[34px] leading-[1.25] text-pretty">{part.title}</div>
            <div className="text-[24px] leading-[1.5] text-pretty text-ink-2">{part.description}</div>
          </div>
          {CHASSIS_PARTS.map((p, i) => (
            <SelectableRow
              key={p.title}
              variant="hotspot"
              index={i}
              title={p.title}
              selected={i === selected}
              onClick={() => actions.selectHotspot(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
