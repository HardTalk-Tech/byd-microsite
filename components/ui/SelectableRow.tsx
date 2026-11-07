import { pad2 } from "@/lib/style/rgba";
import { RowChevronIcon } from "./icons/RowChevronIcon";

interface SelectableRowProps {
  /** 0-based index, shown as "01", "02", … */
  index: number;
  title: string;
  selected: boolean;
  onClick: () => void;
  /**
   * hotspot: 02 Home e-Platform list (80 px, 24 px title).
   * showroom: 05 Showrooms list (72 px so all 9 locations fit, 28 px title, glow, chevron).
   */
  variant: "hotspot" | "showroom";
}

/** Numbered list row with a selected state. */
export function SelectableRow({ index, title, selected, onClick, variant }: SelectableRowProps) {
  const isShowroom = variant === "showroom";

  const rowStyle = {
    background: selected ? "rgba(201,162,74,0.12)" : "rgba(22,23,26,0.5)",
    borderColor: selected ? "rgba(232,200,117,0.6)" : "rgba(255,255,255,0.07)",
    boxShadow:
      isShowroom && selected
        ? "0 0 32px rgba(201,162,74,0.25), inset 0 0 24px rgba(201,162,74,0.08)"
        : "0 0 0 rgba(0,0,0,0)",
  };

  const titleStyle = isShowroom
    ? { color: selected ? "#E8C875" : "#C9CCD2", fontWeight: selected ? 600 : 400 }
    : { color: selected ? "#E8C875" : "#F2F0EB" };

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={
        isShowroom
          ? "flex h-[72px] items-center gap-[22px] rounded-[18px] border border-solid px-7 text-ink transition-all duration-400 active:scale-98 active:shadow-row-pressed!"
          : "flex h-20 items-center gap-5 rounded-[18px] border border-solid px-7 text-ink transition-all duration-400 active:scale-98 active:shadow-row-pressed!"
      }
      style={rowStyle}
    >
      <div className="font-mono text-[22px] text-gold">{pad2(index + 1)}</div>
      <div
        className={isShowroom ? "flex-1 text-left text-[28px]" : "flex-1 text-left text-[24px]"}
        style={titleStyle}
      >
        {title}
      </div>
      {isShowroom && <RowChevronIcon className="opacity-60" />}
    </button>
  );
}
