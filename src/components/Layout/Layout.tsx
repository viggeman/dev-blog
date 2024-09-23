import { ReactNode } from 'react';

import Header from '../Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  globalData?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, globalData }) => {
  const { header } = globalData || {};
  return (
    <>
      {header && <Header blok={header.content} />}
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
