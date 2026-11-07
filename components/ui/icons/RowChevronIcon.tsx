import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function RowChevronIcon({ strokeWidth = 1.8, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <polyline points="9 5 16 12 9 19" />
    </Icon>
  );
}
