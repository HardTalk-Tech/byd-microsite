import { MODELS } from "@/content/models";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * 03 Models – eyebrow and model name. Layers crossfade and rise on change.
 * (The design's colour dot + colour name were removed at the client's request.)
 */
export function ModelIntro({ selectedIndex }: { selectedIndex: number }) {
  return (
    <div className="absolute left-[120px] top-[190px] h-[140px] w-[760px]">
      {MODELS.map((m, i) => {
        const isSelected = i === selectedIndex;
        return (
          <div
            key={m.slug}
            aria-hidden={!isSelected}
            className="absolute left-0 top-0 flex flex-col gap-[22px]"
            style={{
              opacity: isSelected ? 1 : 0,
              transform: `translateY(${isSelected ? 0 : 16}px)`,
              transition: "opacity 700ms ease, transform 800ms var(--ease-kiosk)",
            }}
          >
            <Eyebrow>BYD Electric</Eyebrow>
            <h1 className="font-display text-[84px] leading-none whitespace-nowrap text-ink">{m.name}</h1>
          </div>
        );
      })}
    </div>
  );
}
