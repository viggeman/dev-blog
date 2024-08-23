import { storyblokEditable } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blok: any;
}

const Teaser: FC<Props> = ({ blok }) => {
  return <h2 {...storyblokEditable(blok)}>{blok.headline}</h2>;
};

export default Teaser;
