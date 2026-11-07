import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function DetailsIcon({ strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </Icon>
  );
}
