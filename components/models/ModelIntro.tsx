import { MODELS } from "@/content/models";
import { VehicleName } from "@/components/ui/VehicleName";

/**
 * 03 Models – model name. Layers crossfade and rise on change.
 * (The design's colour dot + colour name were removed at the client's request.)
 */
export function ModelIntro({ selectedIndex }: { selectedIndex: number }) {
  return (
    <div className="absolute left-[120px] top-[175px] h-[140px] w-[760px]">
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
            <h1>
              <VehicleName
                model={m}
                textClassName="font-display text-[84px] leading-none whitespace-nowrap text-ink"
                artworkHeight={52}
                artworkMaxWidth={455}
              />
            </h1>
          </div>
        );
      })}
    </div>
  );
}
