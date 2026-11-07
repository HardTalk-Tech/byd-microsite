import type { ReactNode } from "react";

interface SegmentButtonProps {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}

const ON = {
  background: "rgba(201,162,74,0.16)",
  borderColor: "rgba(232,200,117,0.75)",
  color: "#E8C875",
  boxShadow: "0 0 28px rgba(232,200,117,0.35), inset 0 0 18px rgba(232,200,117,0.12)",
};
const OFF = {
  background: "transparent",
  borderColor: "transparent",
  color: "#C9CCD2",
  boxShadow: "0 0 0 rgba(0,0,0,0)",
};

/** One option in the Exterior / Interior and Day / Night toggles. */
export function SegmentButton({ selected, onClick, icon, children }: SegmentButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="flex h-[84px] items-center gap-[14px] rounded-full border border-solid px-[34px] text-[22px] font-medium uppercase tracking-[0.16em] transition-all duration-400 active:scale-96"
      style={selected ? ON : OFF}
    >
      {icon}
      {children}
    </button>
  );
}
