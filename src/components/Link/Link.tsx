import { storyblokEditable } from '@storyblok/react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  blok: {
    label: string;
    link: {
      cached_url: string;
    };
  };
}

const LinkComponent: FC<Props> = ({ blok }) => {
  const { label, link } = blok;
  const url = link.cached_url;
  const path = url === 'home' ? '/' : `/${url}`;

  return (
    <div {...storyblokEditable(blok)}>
      <Link href={path}>{label}</Link>
    </div>
  );
};

export default LinkComponent;
