import { ReactNode } from 'react';

import Header from '../Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  globalData?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, globalData }) => {
  console.log('globaldata', globalData);
  const { nav, usp_bar } = globalData.content;
  console.log('header', nav, usp_bar);

  return (
    <>
      <Header blok={globalData.content} />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
