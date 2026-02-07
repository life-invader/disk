import { Link, NavLink, type NavLinkRenderProps } from 'react-router';
import { Icon } from '@shared/ui/icon';
import { useAppSelector } from '@/shared/lib/storeHooks';
import { selectIsAuthenticated, selectIsInited } from '@/entities/session';
import clsx from 'clsx';
import styles from './style.module.scss';

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isInited = useAppSelector(selectIsInited);
  const activeClassName = ({ isActive }: NavLinkRenderProps) =>
    clsx(styles.header__link, isActive && styles.isActive);

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

          {isInited && (
            <ul className={styles.header__btnList}>
              {isAuth ? (
                <li>
                  <button>Выход</button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to={'login'} className={activeClassName}>
                      Войти
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to={'register'} className={activeClassName}>
                      Регистрация
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
