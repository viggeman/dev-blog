import { storyblokEditable } from '@storyblok/react';
import { FC } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

interface Props {
  blok: any;
}

const RichText: FC<Props> = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      <div>{render(blok.text)}</div>
    </div>
  );
};

export default RichText;
