import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function ChevronRightIcon({ strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <polyline points="9 4 17 12 9 20" />
    </Icon>
  );
}
