import type { ButtonProps } from '../model/types';
import styles from './style.module.scss';

export const Button = ({ attrs, onClick, children }: ButtonProps) => {
  return (
    <button {...attrs} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
