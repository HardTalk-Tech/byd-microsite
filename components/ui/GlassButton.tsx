import type { ReactNode } from "react";
import { cn } from "@/lib/style/cn";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  /** Size, padding, font size, letter spacing, background, border colour and blur. */
  className?: string;
}

/** Secondary action: dark glass pill with a thin light border. */
export function GlassButton({ children, onClick, className }: GlassButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full border border-solid font-medium uppercase whitespace-nowrap text-ink",
        "transition-[scale,box-shadow,border-color] duration-160 active:scale-96 active:border-[rgba(232,200,117,0.8)]! active:shadow-glow-pressed",
        className,
      )}
    >
      {children}
    </button>
  );
}
