import { FC } from 'react';
import LinkComponent from '../Link/Link';
import styles from './Button.module.scss';

interface Props {
  label: string;
  href?: string;
  linktype?: string;
  style: string;
}

const Button: FC<Props> = ({ label, href, linktype, style }) => {
  console.log('linktype', linktype);
  return (
    <>
      {href ? (
        <LinkComponent label={label} href={href} linktype={linktype} style={style} />
      ) : (
        <button className={styles.cta}>{label}</button>
      )}
    </>
  );
};

export default Button;
