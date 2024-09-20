import { FC } from 'react';
import LinkComponent from '../Link/Link';
import UspBar from '../UspBar/UspBar';
import styles from './Header.module.scss';

interface Props {
  blok: any;
}

const Header: FC<Props> = ({ blok }) => {
  const { nav, usp_bar } = blok;
  return (
    <header className={styles.container}>
      <UspBar blok={usp_bar} />
      <nav className={styles.navbar}>
        <ul>
          {nav.map((item: any) => (
            <li key={item._uid}>
              <LinkComponent href={item.link.cached_url} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
