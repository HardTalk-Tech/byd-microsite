import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function CloseIcon({ strokeWidth = 1.8, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Icon>
  );
}
