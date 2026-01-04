import { Link } from 'react-router';
import { Icon } from '@shared/ui/icon';
import styles from './style.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <div className={styles.header__brand}>
            <div className={styles.header__logoWrapper}>
              <Link to={'/'}>
                <Icon name="logo" />
              </Link>
            </div>

            <div className={styles.header__title}>
              <p>MERN CLOUD</p>
            </div>
          </div>

          <ul className={styles.header__btnList}>
            <li>
              <Link to={'login'}>Войти</Link>
            </li>

            <li>
              <Link to={'register'}>Регистрация</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
