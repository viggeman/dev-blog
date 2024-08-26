import { ReactNode } from 'react';

import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
