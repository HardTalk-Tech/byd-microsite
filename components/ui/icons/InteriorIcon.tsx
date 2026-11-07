import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function InteriorIcon({ strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="3.5" y1="10.5" x2="9.6" y2="11.4" />
      <line x1="20.5" y1="10.5" x2="14.4" y2="11.4" />
      <line x1="12" y1="14.5" x2="12" y2="21" />
    </Icon>
  );
}
