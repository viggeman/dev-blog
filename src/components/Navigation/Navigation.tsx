import Link from 'next/link';
import { FC } from 'react';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href={'/'}>
          <h2>HEPP</h2>
        </Link>
        <ul>
          <Link href={'/about'}>
            <li>About</li>
          </Link>
          <Link href={'/blog'}>
            <li>Blog</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
