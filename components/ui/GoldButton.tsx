import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/style/cn";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import { SweepShine } from "./SweepShine";

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  /** Adds the design's trailing arrow. */
  arrow?: boolean;
  /** Light sweep across the button (off only for the idle toast's button). */
  shine?: boolean;
  /** Size, padding, font size and letter spacing (they differ per use in the design). */
  className?: string;
  /** Use for per-instance shadows (e.g. the nav Test Drive glow). */
  style?: CSSProperties;
}

/** Primary action: gold gradient pill with a light sweep. */
export function GoldButton({
  children,
  onClick,
  arrow = false,
  shine = true,
  className,
  style,
}: GoldButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full border-0 bg-gold-fill font-semibold uppercase whitespace-nowrap text-kiosk-bg shadow-gold-button",
        "transition-[scale,box-shadow] duration-160 active:scale-96 active:shadow-gold-pressed!",
        className,
      )}
      style={style}
    >
      {shine && <SweepShine variant="button" />}
      <span className="relative">{children}</span>
      {arrow && <ArrowRightIcon size={26} className="relative" />}
    </button>
  );
}
