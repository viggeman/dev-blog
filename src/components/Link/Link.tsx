import Link from 'next/link';
import { FC } from 'react';

interface Props {
  blok: any;
}

const LinkComponent: FC<Props> = ({ blok }) => {
  const url = blok.link.cached_url;
  const path = url === 'home' ? '/' : `/${url}`;

  return (
    <div>
      <Link href={path}>{blok.label}</Link>
    </div>
  );
};

export default LinkComponent;
