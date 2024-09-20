import { ReactNode } from 'react';

import Header from '../Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  globalData?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, globalData }) => {
  const isStoryblokEditor =
    typeof window !== 'undefined' && window.location.search.includes('_storyblok');

  console.log('isstoryblok', isStoryblokEditor);
  return (
    <>
      {!isStoryblokEditor && <Header blok={globalData.content} />}
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
