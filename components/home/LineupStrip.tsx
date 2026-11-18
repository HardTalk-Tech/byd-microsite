import { MediaImage } from "@/components/ui/MediaImage";

/**
 * Client-supplied line-up artwork (public/media/home/BYD Range New.webp, 3840 × 1278),
 * cropped at render time to remove its transparent vertical padding.
 */
const LINEUP = { path: "home/BYD Range New.webp", width: 3840, height: 1278 } as const;
/** Drawn width in design px; the height follows the image ratio. */
const DRAW_W = 1600;
/** Remove the transparent padding baked into the source artwork. */
const CROP = { top: 372, bottom: 354 } as const;

/** 02 Home – the nine BYD models side by side on a gold horizon. */
export function LineupStrip() {
  const scale = DRAW_W / LINEUP.width;
  const imageHeight = Math.round(LINEUP.height * scale);
  const cropTop = Math.round(CROP.top * scale);
  const visibleHeight = Math.round((LINEUP.height - CROP.top - CROP.bottom) * scale);

  return (
    <div className="relative flex items-end justify-center">
      <div
        className="pointer-events-none absolute inset-x-[8%] bottom-[-2px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,200,117,0.55) 50%, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-[15%] bottom-[-60px] h-[120px]"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,162,74,0.16), transparent 72%)" }}
      />
      <div className="relative overflow-hidden" style={{ width: DRAW_W, height: visibleHeight }}>
        <div className="absolute inset-x-0" style={{ top: -cropTop, height: imageHeight }}>
          <MediaImage
            path={LINEUP.path}
            alt="The BYD line-up: nine models side by side"
            width={DRAW_W}
            transparent
            fit="contain"
          />
        </div>
      </div>
    </div>
  );
}
