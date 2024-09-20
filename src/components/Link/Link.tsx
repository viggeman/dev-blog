import Link from 'next/link';
import { FC } from 'react';

interface Props {
  href: string;
  label: string;
  linktype?: string;
  className?: string;
}

const LinkComponent: FC<Props> = ({ href, label, linktype, className }) => {
  let path = href === 'home' ? '/' : `/${href}`;
  const isExternal = linktype === 'url';
  const isEmail = linktype === 'email';
  path = isEmail ? `mailto:${path}` : path;

  return (
    <Link
      className={className}
      href={path}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {label}
    </Link>
  );
};

export default LinkComponent;
