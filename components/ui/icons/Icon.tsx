import type { ReactNode } from "react";

export interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

interface IconBaseProps extends IconProps {
  children: ReactNode;
  strokeLinecap?: "round";
  strokeLinejoin?: "round";
}

/** Shared 24 × 24 stroke-icon frame used by every icon in this folder. */
export function Icon({
  size = 24,
  strokeWidth = 1.6,
  className,
  strokeLinecap,
  strokeLinejoin,
  children,
}: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
