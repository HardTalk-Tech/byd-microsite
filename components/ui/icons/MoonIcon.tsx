import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

export function MoonIcon({ strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <Icon strokeWidth={strokeWidth} strokeLinejoin="round" {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
    </Icon>
  );
}
