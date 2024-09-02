import Link from 'next/link';
import { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  href: string;
  text: string;
}

const Button: FC<Props> = ({ href, text }) => {
  return (
    <>
      <Link href={href} className={styles.cta}>
        {text}
      </Link>
    </>
  );
};

export default Button;
