import { ReactNode } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  globalData?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, globalData }) => {
  const { header, footer } = globalData || {};
  return (
    <>
      {header && <Header blok={header.content} />}
      <main className={styles.container}>{children}</main>
      {footer && <Footer blok={footer.content} />}
    </>
  );
};

export default Layout;
