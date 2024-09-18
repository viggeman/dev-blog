import Link from 'next/link';
import { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  label: string;
  href?: string;
  linktype?: string;
}

const Button: FC<Props> = ({ label, href, linktype }) => {
  // const isEmail = comLink?.includes('@');
  // Redo this in link comp
  console.log('linktype', linktype);
  return (
    <>
      {href ? (
        <Link href={href} className={styles.cta}>
          {label}
        </Link>
      ) : (
        <button className={styles.cta}>{label}</button>
      )}
    </>
  );
};

export default Button;
