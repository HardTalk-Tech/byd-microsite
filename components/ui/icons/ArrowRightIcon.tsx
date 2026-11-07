import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function ArrowRightIcon({ strokeWidth = 2, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </Icon>
  );
}
