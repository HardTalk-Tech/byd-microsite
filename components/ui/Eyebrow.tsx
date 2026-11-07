import type { ReactNode } from "react";
import { cn } from "@/lib/style/cn";

/** Small uppercase gold label above headings. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-[22px] font-medium uppercase tracking-[0.32em] text-gold", className)}>
      {children}
    </div>
  );
}
