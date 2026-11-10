import type { ReactNode } from "react";
import { cn } from "@/lib/style/cn";

const VARIANTS = {
  /** 76 px close (×). */
  close:
    "h-[76px] w-[76px] bg-white/5 border-white/16 text-ink active:scale-94 active:border-[rgba(232,200,117,0.8)] active:shadow-glow-pressed-sm",
  /** 76 px back button with gold border (04 Experience). */
  back: "h-[76px] w-[76px] bg-white/5 border-[rgba(201,162,74,0.45)] text-gold-light active:scale-94 active:shadow-[0_0_28px_rgba(232,200,117,0.55)]",
  /** 104 px prev / next over video (blurred glass). */
  step: "h-[104px] w-[104px] bg-surface-1/50 backdrop-blur-[16px] border-white/12 text-ink active:scale-94 active:border-[rgba(232,200,117,0.8)] active:shadow-glow-pressed-strong",
  /** 104 px prev / next in 04c Gallery Fullscreen. */
  gallery:
    "h-[104px] w-[104px] bg-surface-1/60 border-white/12 text-ink active:scale-94 active:border-[rgba(232,200,117,0.8)] active:shadow-glow-pressed-strong",
} as const;

interface CircleIconButtonProps {
  variant: keyof typeof VARIANTS;
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

/** Round icon-only button. */
export function CircleIconButton({ variant, label, onClick, children, className }: CircleIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full border p-0 transition-[scale,box-shadow] duration-160",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
