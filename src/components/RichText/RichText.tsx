import { storyblokEditable } from '@storyblok/react';
import { FC } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';
import styles from './RichText.module.scss';

interface Props {
  blok: any;
}

const RichText: FC<Props> = ({ blok }) => {
  console.log('rtblok', blok);
  return (
    <div {...storyblokEditable(blok)}>
      <div className={styles.richText}>{render(blok.text)}</div>
    </div>
  );
};

export default RichText;
