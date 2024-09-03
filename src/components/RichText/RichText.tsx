import { FC } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

interface Props {
  blok: any;
}

const RichText: FC<Props> = ({ blok }) => {
  return <div>{render(blok.text)}</div>;
};

export default RichText;
