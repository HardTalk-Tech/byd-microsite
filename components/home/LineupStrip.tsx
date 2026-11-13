import { MediaImage } from "@/components/ui/MediaImage";

/**
 * Client-supplied line-up photo (public/media/home/lineup-new.png, 2172 × 724), trimmed to the
 * cars and saved as home/lineup.webp (2137 × 306, transparent).
 */
const LINEUP = { path: "home/lineup.webp", width: 2137, height: 306 } as const;
/** Drawn width in design px; the height follows the image ratio. */
const DRAW_W = 1600;

/** 02 Home – the nine BYD models side by side on a gold horizon. */
export function LineupStrip() {
  const h = Math.round((DRAW_W * LINEUP.height) / LINEUP.width);

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
      <div className="relative" style={{ width: DRAW_W, height: h }}>
        <MediaImage
          path={LINEUP.path}
          alt="The BYD line-up: nine models side by side"
          width={DRAW_W}
          transparent
          fit="contain"
        />
      </div>
    </div>
  );
}
