import type { iconMap } from "./iconMap";

type IconName = keyof typeof iconMap;

export type IconProps = {
  name: IconName;
  size?: number;
};
