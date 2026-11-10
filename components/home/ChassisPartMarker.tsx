import { pad2 } from "@/lib/style/rgba";

interface ChassisPartMarkerProps {
  index: number;
  title: string;
  /** Centre in the chassis stage (px). */
  x: number;
  y: number;
  selected: boolean;
  onClick: () => void;
}

/** Numbered marker on a chassis part (80 px touch area, 52 px circle). */
export function ChassisPartMarker({ index, title, x, y, selected, onClick }: ChassisPartMarkerProps) {
  return (
    <button
      type="button"
      aria-label={`${pad2(index + 1)} ${title}`}
      aria-pressed={selected}
      onClick={onClick}
      className="absolute flex h-20 w-20 items-center justify-center border-0 bg-transparent p-0 transition-[scale] duration-160 active:scale-94"
      style={{ left: x - 40, top: y - 40 }}
    >
      <span
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-solid border-gold-light font-mono text-[22px] transition-all duration-400"
        style={{
          background: selected ? "linear-gradient(135deg,#C9A24A,#E8C875)" : "rgba(10,10,11,0.75)",
          color: selected ? "#0A0A0B" : "#E8C875",
          boxShadow: `0 0 ${selected ? 28 : 8}px rgba(232,200,117,0.7)`,
        }}
      >
        {pad2(index + 1)}
      </span>
    </button>
  );
}
