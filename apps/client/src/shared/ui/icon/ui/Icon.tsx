import { iconMap } from '../model/iconMap';
import type { IconProps } from '../model/types';
import style from './style.module.scss';

export const Icon = ({ name }: IconProps) => {
  const IconComponent = iconMap[name];

  return (
    <span className={style.icon}>
      <IconComponent />
    </span>
  );
};
