import Link from 'next/link';
import { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  button: {
    label: string;
    href?: string;
  };
}

const Button: FC<Props> = ({ button }) => {
  const { label, href } = button;

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
