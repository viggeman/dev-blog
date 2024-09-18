import Link from 'next/link';
import { FC } from 'react';

interface Props {
  href: string;
  label: string;
}

const LinkComponent: FC<Props> = ({ href, label }) => {
  const path = href === 'home' ? '/' : `/${href}`;

  return <Link href={path}>{label}</Link>;
};

export default LinkComponent;
