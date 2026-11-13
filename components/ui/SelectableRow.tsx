import { pad2 } from "@/lib/style/rgba";

interface SelectableRowProps {
  /** 0-based index, shown as "01", "02", … */
  index: number;
  title: string;
  /** Second line under the title, e.g. a Colombo area. */
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Numbered list row with a selected state – 05 Showrooms two-column list
 * (88 px, 26 px title + optional 22 px subtitle, glow when selected), fits 12+ locations
 * without scrolling.
 */
export function SelectableRow({ index, title, subtitle, selected, onClick }: SelectableRowProps) {
  const rowStyle = {
    background: selected ? "rgba(201,162,74,0.12)" : "rgba(22,23,26,0.5)",
    borderColor: selected ? "rgba(232,200,117,0.6)" : "rgba(255,255,255,0.07)",
    boxShadow: selected
      ? "0 0 32px rgba(201,162,74,0.25), inset 0 0 24px rgba(201,162,74,0.08)"
      : "0 0 0 rgba(0,0,0,0)",
  };
  const titleStyle = { color: selected ? "#E8C875" : "#C9CCD2", fontWeight: selected ? 600 : 400 };

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={subtitle ? `${title} – ${subtitle}` : undefined}
      onClick={onClick}
      className="flex h-[88px] min-w-0 items-center gap-3 rounded-[18px] border border-solid px-5 text-ink transition-all duration-400 active:scale-98 active:shadow-row-pressed!"
      style={rowStyle}
    >
      <div className="font-mono text-[22px] text-gold">{pad2(index + 1)}</div>
      <div className="flex min-w-0 flex-1 flex-col text-left leading-[1.15]">
        <span className="truncate text-[26px]" style={titleStyle}>
          {title}
        </span>
        {subtitle && <span className="truncate text-[22px] text-ink-4">{subtitle}</span>}
      </div>
    </button>
  );
}
