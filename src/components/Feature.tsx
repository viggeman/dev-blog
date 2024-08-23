import { storyblokEditable } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blok: any;
}

const Feature: FC<Props> = ({ blok }) => {
  return (
    <div className="column feature" {...storyblokEditable(blok)}>
      {blok.name}
    </div>
  );
};

export default Feature;
