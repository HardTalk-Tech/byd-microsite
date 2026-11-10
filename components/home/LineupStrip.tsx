import { MODELS } from "@/content/models";
import { rgba } from "@/lib/style/rgba";
import { MediaImage } from "@/components/ui/MediaImage";

/** Cut-outs are 1020 × 430; the centre car is drawn at this width, the rest step down. */
const BASE_W = 300;
const CUT_RATIO = 430 / 1020;

/**
 * 02 Home – the nine models side by side on a gold horizon, largest in the
 * centre and fading towards the edges (built from the existing car cut-outs).
 */
export function LineupStrip() {
  const mid = (MODELS.length - 1) / 2;

  return (
    <div className="relative flex items-end justify-center" aria-label="The BYD line-up">
      <div
        className="pointer-events-none absolute inset-x-[8%] bottom-[-2px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,200,117,0.55) 50%, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-[15%] bottom-[-60px] h-[120px]"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,162,74,0.16), transparent 72%)" }}
      />
      {MODELS.map((m, i) => {
        const d = Math.abs(i - mid);
        const w = Math.round(BASE_W * (1 - 0.08 * d));
        return (
          <div
            key={m.slug}
            className="relative -mx-[26px]"
            style={{ width: w, height: Math.round(w * CUT_RATIO), opacity: 1 - 0.08 * d, zIndex: 10 - Math.round(d) }}
          >
            <div
              className="pointer-events-none absolute inset-x-[12%] bottom-[-10px] h-6 blur-[8px]"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${rgba(m.accent, 0.5)}, transparent 70%)` }}
            />
            <MediaImage path={m.media.cutout} alt={m.fullName} width={w} tint={m.accent} transparent fit="contain" />
          </div>
        );
      })}
    </div>
  );
}
