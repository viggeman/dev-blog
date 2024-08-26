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
          <Link href={'/'}>
            <li>Recipes</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
