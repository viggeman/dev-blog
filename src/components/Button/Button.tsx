import { FC } from 'react';
import LinkComponent from '../Link/Link';
import styles from './Button.module.scss';

interface Props {
  label: string;
  href?: string;
  linktype?: string;
  className?: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({ label, href, linktype, className, onClick }) => {
  const classNames = [styles.cta, className ? className : ''].join(' ');
  return (
    <>
      {href ? (
        <LinkComponent label={label} href={href} linktype={linktype} className={classNames} />
      ) : (
        <button onClick={onClick} className={classNames}>
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
