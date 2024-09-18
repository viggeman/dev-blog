import Link from 'next/link';
import { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  label: string;
  href?: string;
  comLink?: string;
}

const Button: FC<Props> = ({ label, href, comLink }) => {
  console.log('href', href);
  const isEmail = comLink?.includes('@');
  // Redo this in link comp
  return (
    <>
      {href ? (
        <Link href={href} className={styles.cta}>
          {label}
        </Link>
      ) : comLink ? (
        <a className={styles.cta} href={`${isEmail === true ? 'mailto:' : 'tel:'}${comLink}`}>
          {label}
        </a>
      ) : (
        <button className={styles.cta}>{label}</button>
      )}
    </>
  );
};

export default Button;
