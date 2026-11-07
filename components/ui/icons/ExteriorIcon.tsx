import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function ExteriorIcon({ strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} strokeLinejoin="round" {...props}>
      <path d="M3 16v-3l2.2-4.4A2 2 0 0 1 7 7.5h10a2 2 0 0 1 1.8 1.1L21 13v3h-2" />
      <line x1="9" y1="16" x2="15" y2="16" />
      <line x1="3" y1="16" x2="5" y2="16" />
      <circle cx="7" cy="16.5" r="2" />
      <circle cx="17" cy="16.5" r="2" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}
