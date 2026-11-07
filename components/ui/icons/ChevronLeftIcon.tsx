import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function ChevronLeftIcon({ strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <polyline points="15 4 7 12 15 20" />
    </Icon>
  );
}
