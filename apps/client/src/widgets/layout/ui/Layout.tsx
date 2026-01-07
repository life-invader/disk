import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/header';
import styles from './style.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main>
        <Outlet />
      </main>

      <div>footer</div>
    </div>
  );
};
