import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function ArrowLeftIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <line x1="20" y1="12" x2="5" y2="12" />
      <polyline points="11 6 5 12 11 18" />
    </Icon>
  );
}
