import Link from 'next/link';
import { FC } from 'react';
import styles from './Link.module.scss';

interface Props {
  href: string;
  label: string;
  linktype?: string;
  style: string;
}

const LinkComponent: FC<Props> = ({ href, label, linktype, style }) => {
  const path = href === 'home' ? '/' : `/${href}`;
  const isExternal = linktype === 'url';
  const isEmail = linktype === 'email';
  const linkStyle = styles[style];

  return (
    <>
      {isExternal ? (
        <a
          href={href}
          className={linkStyle}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {label}
        </a>
      ) : isEmail ? (
        <a href={`mailto:${href}`} className={linkStyle}>
          {label}
        </a>
      ) : (
        <Link className={linkStyle} href={path}>
          {label}
        </Link>
      )}
    </>
  );
};

export default LinkComponent;
