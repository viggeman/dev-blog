import Link from 'next/link';
import { FC } from 'react';

interface Props {
  href: string;
  label: string;
  linktype?: string;
  className?: string;
}

const LinkComponent: FC<Props> = ({ href, label, linktype, className }) => {
  let path: any;
  const isExternal = linktype === 'url';
  const isEmail = linktype === 'email';

  if (isEmail) {
    path = `mailto:${href}`;
  } else {
    path = href === 'home' ? '/' : `/${href}`;
  }

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
